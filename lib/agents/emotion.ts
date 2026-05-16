/**
 * Emotion Agent — the listening half of CadeauAura's voice.
 *
 *   reflectAgent  telling → one mirror sentence
 *   deepenAgent   telling + reflection → follow-up + anchors + tone
 *
 * Both go through Claude Haiku with a deterministic restraint gate
 * and a deterministic fallback. The fallback is what runs when no
 * ANTHROPIC_API_KEY is set, so the rehearsal never breaks in local
 * dev or preview environments.
 *
 * The existing /api/reflect and /api/follow-up routes are thin
 * wrappers around these — the agents own the logic.
 */

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { getClaude, MODELS } from '@/lib/ai/claude';
import {
  FOLLOW_UP_SYSTEM_PROMPT,
  REFLECTOR_SYSTEM_PROMPT,
} from '@/lib/ai/prompts';
import { passesRestraint } from '@/lib/ai/restraint';
import type { Tone } from '@/lib/draft';

import { fail, ok } from './runner';
import type { Agent } from './types';

// ── Reflect ────────────────────────────────────────────────────────────────

export interface ReflectInput {
  telling: string;
}

export interface ReflectOutput {
  text: string;
}

export const reflectAgent: Agent<ReflectInput, ReflectOutput> = {
  name: 'reflect',
  async run(input) {
    const telling = (input.telling ?? '').trim();
    if (telling.length < 1 || telling.length > 2000) {
      return fail('telling must be 1–2000 characters');
    }

    const client = getClaude();
    if (!client) {
      return ok({ text: deterministicReflection(telling) }, 'fallback');
    }

    try {
      const text = await callReflect(client, telling);
      return ok({ text }, 'model');
    } catch {
      return ok({ text: deterministicReflection(telling) }, 'fallback');
    }
  },
};

async function callReflect(client: Anthropic, telling: string): Promise<string> {
  const first = await client.messages.create({
    model: MODELS.haiku,
    max_tokens: 80,
    system: REFLECTOR_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: telling }],
  });

  const firstText = extractText(first);
  const firstCheck = passesRestraint(firstText, 'reflector');
  if (firstCheck.ok) return firstText;

  const retry = await client.messages.create({
    model: MODELS.haiku,
    max_tokens: 80,
    system: REFLECTOR_SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: telling },
      { role: 'assistant', content: firstText },
      {
        role: 'user',
        content: `That response ${firstCheck.reason}. Return a single short sentence that follows every voice rule strictly. No preamble. No quotes.`,
      },
    ],
  });

  const retryText = extractText(retry);
  const retryCheck = passesRestraint(retryText, 'reflector');
  if (retryCheck.ok) return retryText;

  throw new Error(
    `reflector failed restraint twice: ${firstCheck.reason} / ${retryCheck.reason}`,
  );
}

function extractText(response: Anthropic.Message): string {
  const block = response.content.find((entry) => entry.type === 'text');
  const raw = block && block.type === 'text' ? block.text : '';
  return raw
    .trim()
    .replace(/^["'‘’“”]+/, '')
    .replace(/["'‘’“”]+$/, '')
    .trim();
}

function deterministicReflection(telling: string): string {
  const normalised = telling.trim().toLowerCase();
  const wordCount = normalised.split(/\s+/).filter(Boolean).length;

  if (/\b(passed|gone|miss(ed)?|died|no longer here|used to be|she was|he was)\b/.test(normalised)) {
    return 'This one is for someone you have already said goodbye to.';
  }

  if (/\b(hate|never deserved|doesn'?t deserve|never apologi[sz]ed|hurt me|asshole)\b/.test(normalised)) {
    return 'Tell me one thing they got right, even once.';
  }

  if (wordCount < 10) {
    return pickByHash(normalised, [
      'Tell me about a single morning with them you still think about.',
      'What did they hold for you that no one else did?',
      'Name one small thing they did this week that you noticed but did not say.',
    ]);
  }

  return pickByHash(normalised, [
    'It sounds like they have stayed with you in ways that took time to name.',
    'It sounds like they carried you through something you needed.',
    'You have been waiting to say this for longer than just today.',
  ]);
}

// ── Deepen ─────────────────────────────────────────────────────────────────

export interface DeepenInput {
  telling: string;
  reflection?: string;
}

export interface DeepenOutput {
  followUp: string;
  anchors: string[];
  tone: Exclude<Tone, ''>;
  secondaryTone: Exclude<Tone, ''> | null;
}

const ToneSchema = z.enum([
  'vague',
  'warm',
  'specific',
  'grief',
  'distance',
  'hurt',
]);

const ModelPayloadSchema = z.object({
  anchors: z.array(z.string().trim().min(1).max(80)).min(1).max(6),
  tone: ToneSchema,
  secondaryTone: ToneSchema.nullable().optional(),
  followUp: z.string().trim().min(1).max(200),
});

export const deepenAgent: Agent<DeepenInput, DeepenOutput> = {
  name: 'deepen',
  async run(input) {
    const telling = (input.telling ?? '').trim();
    if (telling.length < 1 || telling.length > 2000) {
      return fail('telling must be 1–2000 characters');
    }
    const reflection = input.reflection?.trim();

    const client = getClaude();
    if (!client) {
      return ok(deterministicDeepen(telling), 'fallback');
    }

    try {
      const data = await callDeepen(client, telling, reflection);
      return ok(data, 'model');
    } catch {
      return ok(deterministicDeepen(telling), 'fallback');
    }
  },
};

async function callDeepen(
  client: Anthropic,
  telling: string,
  reflection?: string,
): Promise<DeepenOutput> {
  const userContent = reflection
    ? `Sender's telling:\n${telling}\n\nReflection already returned to them:\n${reflection}`
    : `Sender's telling:\n${telling}`;

  const response = await client.messages.create({
    model: MODELS.haiku,
    max_tokens: 400,
    system: FOLLOW_UP_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userContent }],
  });

  const block = response.content.find((entry) => entry.type === 'text');
  const text = block && block.type === 'text' ? block.text.trim() : '';
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error('no JSON payload');

  const candidate: unknown = JSON.parse(text.slice(start, end + 1));
  const parsed = ModelPayloadSchema.parse(candidate);

  const check = passesRestraint(parsed.followUp, 'reflector');
  if (!check.ok) {
    throw new Error(`deepen failed restraint: ${check.reason}`);
  }

  return {
    followUp: parsed.followUp,
    anchors: parsed.anchors.slice(0, 4).map((a) => a.toLowerCase()),
    tone: parsed.tone,
    secondaryTone: parsed.secondaryTone ?? null,
  };
}

function deterministicDeepen(telling: string): DeepenOutput {
  const normalised = telling.trim().toLowerCase();
  const wordCount = normalised.split(/\s+/).filter(Boolean).length;

  let tone: Exclude<Tone, ''>;
  if (/\b(passed|died|funeral|grave|buried|no longer with us|left us|gone for(ever)?|she'?s gone|he'?s gone)\b/.test(normalised)) {
    tone = 'grief';
  } else if (/\b(hate|never deserved|doesn'?t deserve|never apologi[sz]ed|hurt me|asshole|betray|cheated|lied to me)\b/.test(normalised)) {
    tone = 'hurt';
  } else if (/\b(used to be close|haven'?t spoken|drifted|estranged|out of touch|lost touch|long time ago|years ago|complicated|distant|fell out|stopped talking)\b/.test(normalised)) {
    tone = 'distance';
  } else if (wordCount < 10) {
    tone = 'vague';
  } else if (wordCount < 25) {
    tone = 'warm';
  } else {
    tone = 'specific';
  }

  const followUp = ({
    grief: 'There is no rush to find the right words today.',
    distance: 'What would still make you want to send this, after everything?',
    hurt: 'Is there a single moment, even small, that you would keep?',
    vague: 'What is one small thing about them you would notice from across a room?',
    warm: 'What do you think they have not realized about how much it mattered?',
    specific: 'What did this person know about you that no one else did?',
  })[tone];

  return {
    followUp,
    anchors: extractAnchorsHeuristic(telling),
    tone,
    secondaryTone: null,
  };
}

const STOPWORDS = new Set([
  'the','a','an','and','or','but','is','was','were','are','am','i','me','my','mine',
  'you','your','yours','he','she','they','it','to','of','in','on','for','with','that',
  'this','at','as','be','by','from','have','has','had','do','does','did','so','if',
  'then','when','what','which','who','how','very','just','really','all','some','any',
  'one','two','three','no','yes','about','out','up','down','over','under','again',
  'still','also','too','only','more','most','less','because','though','since','while',
  'her','him','his','hers','their','theirs','our','ours','we','us','can','could',
  'would','should','will','shall','may','might','must','not','dont','doesnt','didnt',
  'isnt','wasnt','werent','arent','im','its','thats',
]);

function extractAnchorsHeuristic(telling: string): string[] {
  const cleaned = telling.replace(/[.!?,;:'"()]/g, ' ').toLowerCase();
  const tokens = cleaned.split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const picked: string[] = [];

  for (const tok of tokens) {
    if (tok.length < 4) continue;
    if (STOPWORDS.has(tok)) continue;
    if (seen.has(tok)) continue;
    seen.add(tok);
    picked.push(tok);
    if (picked.length >= 4) break;
  }

  if (picked.length === 0) return ['someone you care about'];
  if (picked.length === 1) return [picked[0], 'someone you care about'];
  return picked;
}

function pickByHash(seed: string, options: readonly string[]): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash + seed.charCodeAt(i)) % 1_000_000;
  }
  return options[hash % options.length];
}
