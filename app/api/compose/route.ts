import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { getClaude, MODELS } from '@/lib/ai/claude';
import { COMPOSER_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { passesRestraint } from '@/lib/ai/restraint';

export const runtime = 'edge';

/**
 * The Composer route. Returns three short message drafts the sender
 * could send to the recipient, written in the sender's voice.
 *
 * Input contract:
 *   - recipientName: short name string (used sparingly inside drafts)
 *   - telling: the raw telling from step 02
 *   - anchors: 2–4 short phrases the follow-up route surfaced
 *   - tone: one of grief / hurt / vague / warm / specific (or null)
 *   - emotion: optional UI-selected emotion chip
 *
 * Output:
 *   { drafts: [string, string, string], source: 'model' | 'fallback' }
 *
 * Each returned draft has passed the 'composer' restraint profile
 * (max 3 sentences, max 20 words per sentence, max 55 words total,
 * no banned adjectives, no self-reference, no exclamation marks).
 * If the model returns fewer than 3 passing drafts, the route tops
 * up from a deterministic, tone-adapted fallback set so the UI
 * always has three cards to render.
 */

const ToneSchema = z.enum(['vague', 'warm', 'specific', 'grief', 'hurt']);

const RequestSchema = z.object({
  recipientName: z.string().trim().min(1).max(80),
  telling: z.string().trim().min(1).max(2000),
  anchors: z.array(z.string().trim().min(1).max(80)).max(6).optional(),
  tone: ToneSchema.nullable().optional(),
  emotion: z.string().trim().max(40).optional(),
});

const ModelPayloadSchema = z.object({
  drafts: z.array(z.string().trim().min(1).max(600)).min(1).max(6),
});

type Tone = z.infer<typeof ToneSchema>;

interface ComposerPayload {
  drafts: string[];
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

  const { recipientName, telling, anchors, tone, emotion } = parsed.data;
  const safeTone: Tone | null = tone ?? null;

  const client = getClaude();
  if (!client) {
    return jsonReply({
      drafts: fallbackDrafts(recipientName, safeTone, anchors ?? []),
      source: 'fallback',
    });
  }

  try {
    const modelDrafts = await callComposer(client, {
      recipientName,
      telling,
      anchors: anchors ?? [],
      tone: safeTone,
      emotion: emotion ?? '',
    });
    const passing = modelDrafts.filter(
      (text) => passesRestraint(text, 'composer').ok,
    );
    const filled = topUpToThree(passing, recipientName, safeTone, anchors ?? []);
    return jsonReply({
      drafts: filled,
      source: passing.length > 0 ? 'model' : 'fallback',
    });
  } catch {
    return jsonReply({
      drafts: fallbackDrafts(recipientName, safeTone, anchors ?? []),
      source: 'fallback',
    });
  }
}

interface ComposerArgs {
  recipientName: string;
  telling: string;
  anchors: string[];
  tone: Tone | null;
  emotion: string;
}

async function callComposer(client: Anthropic, args: ComposerArgs): Promise<string[]> {
  const lines: string[] = [];
  lines.push(`Recipient name: ${args.recipientName}`);
  lines.push(`What the sender wrote about them:\n${args.telling}`);
  if (args.anchors.length > 0) {
    lines.push(`Anchors that surfaced: ${args.anchors.join(' / ')}`);
  }
  if (args.tone) {
    lines.push(`Emotional tone: ${args.tone}`);
  }
  if (args.emotion) {
    lines.push(`The sender wants the recipient to feel: ${args.emotion.toLowerCase()}`);
  }

  const response = await client.messages.create({
    model: MODELS.sonnet,
    max_tokens: 700,
    system: COMPOSER_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: lines.join('\n\n') }],
  });

  const block = response.content.find((entry) => entry.type === 'text');
  const text = block && block.type === 'text' ? block.text.trim() : '';
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < 0) {
    throw new Error('no JSON payload in composer response');
  }

  const candidate: unknown = JSON.parse(text.slice(start, end + 1));
  const parsed = ModelPayloadSchema.parse(candidate);
  return parsed.drafts.slice(0, 3);
}

function topUpToThree(
  passing: string[],
  recipientName: string,
  tone: Tone | null,
  anchors: string[],
): string[] {
  if (passing.length >= 3) return passing.slice(0, 3);
  const fallback = fallbackDrafts(recipientName, tone, anchors);
  const out = [...passing];
  for (const candidate of fallback) {
    if (out.length >= 3) break;
    if (out.includes(candidate)) continue;
    out.push(candidate);
  }
  return out.slice(0, 3);
}

function fallbackDrafts(
  recipientName: string,
  tone: Tone | null,
  anchors: string[],
): string[] {
  const name = recipientName.trim();
  const anchorOne = anchors[0] ?? '';
  const anchorPhrase = anchorOne ? `'${anchorOne}'` : 'the small things';

  const sets: Record<Tone, string[]> = {
    grief: [
      `I think about you when I do the small things you would have noticed. You are still part of how I move through the day.`,
      `${name}, you are not as far away as the calendar makes you sound. Thank you for what you left in me.`,
      `Some days I forget, and then ${anchorPhrase} comes back and I remember everything at once.`,
    ],
    hurt: [
      `I am not sure how to say this clearly. There was something you got right, and I will hold that. The rest I am still working out.`,
      `${name}, I have been carrying this for a while. I do not need an answer. I just needed to say it out loud once.`,
      `What you did is not the whole story. I remember ${anchorPhrase}, and I am keeping that part.`,
    ],
    vague: [
      `There is more to say than I can manage today. But I wanted to send something. So this is the start.`,
      `${name}, I have been meaning to write. I am not sure how to begin, so I am just beginning.`,
      `Some of what I feel about you is hard to put into words. ${anchorPhrase} keeps coming to mind, though.`,
    ],
    warm: [
      `Thank you for being someone I do not have to explain myself to. I see what you carry, even when you do not.`,
      `${name}, I am better because of you. I do not say it often enough, so I am saying it now.`,
      `You make a quieter version of me feel possible. ${anchorPhrase} stays with me more than you know.`,
    ],
    specific: [
      `${name}, I have been meaning to tell you for a while. ${anchorPhrase} stays with me more than you know. Thank you for that.`,
      `What you did was not a small thing, even if you treated it like one. I remember it. I keep remembering it.`,
      `I think about ${anchorPhrase} more than I let on. You probably do not know how much it shaped me.`,
    ],
  };

  const key: Tone = tone ?? 'warm';
  return sets[key];
}

function jsonReply(payload: ComposerPayload): Response {
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
