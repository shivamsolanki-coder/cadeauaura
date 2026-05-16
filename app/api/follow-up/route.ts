import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { getClaude, MODELS } from '@/lib/ai/claude';
import { FOLLOW_UP_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { passesRestraint } from '@/lib/ai/restraint';

export const runtime = 'edge';

const RequestSchema = z.object({
  telling: z.string().trim().min(1).max(2000),
  reflection: z.string().trim().min(1).max(500).optional(),
});

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

export type FollowUpTone = z.infer<typeof ToneSchema>;

interface FollowUpPayload {
  anchors: string[];
  tone: FollowUpTone;
  secondaryTone: FollowUpTone | null;
  followUp: string;
  source: 'model' | 'fallback';
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  const parsed = RequestSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonError('Invalid input', 400);
  }

  const { telling, reflection } = parsed.data;

  const client = getClaude();
  if (!client) {
    return jsonReply({ ...fallbackFollowUp(telling), source: 'fallback' });
  }

  try {
    const result = await callFollowUp(client, telling, reflection);
    return jsonReply({ ...result, source: 'model' });
  } catch {
    return jsonReply({ ...fallbackFollowUp(telling), source: 'fallback' });
  }
}

async function callFollowUp(
  client: Anthropic,
  telling: string,
  reflection?: string,
): Promise<Omit<FollowUpPayload, 'source'>> {
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
  if (start < 0 || end < 0) {
    throw new Error('no JSON payload in response');
  }

  const candidate: unknown = JSON.parse(text.slice(start, end + 1));
  const parsed = ModelPayloadSchema.parse(candidate);

  const check = passesRestraint(parsed.followUp, 'reflector');
  if (!check.ok) {
    throw new Error(`follow-up failed restraint: ${check.reason}`);
  }

  return {
    anchors: parsed.anchors.slice(0, 4).map((a) => a.toLowerCase()),
    tone: parsed.tone,
    secondaryTone: parsed.secondaryTone ?? null,
    followUp: parsed.followUp,
  };
}

function fallbackFollowUp(telling: string): Omit<FollowUpPayload, 'source'> {
  const normalised = telling.trim().toLowerCase();
  const wordCount = normalised.split(/\s+/).filter(Boolean).length;

  let tone: FollowUpTone;

  // Order matters: grief (death) must beat distance (drift). Hurt is its
  // own register and must not be conflated with either.
  if (
    /\b(passed|died|funeral|grave|buried|no longer with us|left us|gone for(ever)?|she'?s gone|he'?s gone)\b/.test(
      normalised,
    )
  ) {
    tone = 'grief';
  } else if (
    /\b(hate|never deserved|doesn'?t deserve|never apologi[sz]ed|hurt me|asshole|betray|cheated|lied to me)\b/.test(
      normalised,
    )
  ) {
    tone = 'hurt';
  } else if (
    /\b(used to be close|haven'?t spoken|drifted|estranged|out of touch|lost touch|long time ago|years ago|complicated|distant|fell out|stopped talking)\b/.test(
      normalised,
    )
  ) {
    tone = 'distance';
  } else if (wordCount < 10) {
    tone = 'vague';
  } else if (wordCount < 25) {
    tone = 'warm';
  } else {
    tone = 'specific';
  }

  const followUp = {
    grief: 'There is no rush to find the right words today.',
    distance: 'What would still make you want to send this, after everything?',
    hurt: 'Is there a single moment, even small, that you would keep?',
    vague: 'What is one small thing about them you would notice from across a room?',
    warm: 'What do you think they have not realized about how much it mattered?',
    specific: 'What did this person know about you that no one else did?',
  }[tone];

  return {
    anchors: extractAnchorsHeuristic(telling),
    tone,
    secondaryTone: null,
    followUp,
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

function jsonReply(payload: FollowUpPayload): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
