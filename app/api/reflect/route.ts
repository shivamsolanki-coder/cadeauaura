import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { getClaude, MODELS } from '@/lib/ai/claude';
import { REFLECTOR_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { passesRestraint } from '@/lib/ai/restraint';

export const runtime = 'edge';

/**
 * The Reflector route. Returns one short sentence that mirrors or
 * gently questions the sender's free-text telling about someone they
 * care about.
 *
 * The response is plain JSON, not a stream. The client-side
 * typewriter in the UI handles the dramatic reveal at a fixed
 * cadence, which keeps the model call simple and lets us run the
 * restraint gate cleanly before any character reaches the surface.
 *
 * Falls back to a hand-written deterministic reflection when no API
 * key is configured (e.g. local builds without secrets), so this
 * route never breaks the user-visible experience.
 */

const RequestSchema = z.object({
  telling: z.string().trim().min(1).max(2000),
  attempt: z.number().int().min(0).max(5).optional(),
});

interface ReflectorPayload {
  text: string;
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

  const { telling } = parsed.data;

  const client = getClaude();
  if (!client) {
    return jsonReply({ text: fallbackReflection(telling), source: 'fallback' });
  }

  try {
    const modelText = await callReflector(client, telling);
    return jsonReply({ text: modelText, source: 'model' });
  } catch {
    return jsonReply({ text: fallbackReflection(telling), source: 'fallback' });
  }
}

async function callReflector(
  client: Anthropic,
  telling: string,
): Promise<string> {
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
    `Reflector failed restraint twice: ${firstCheck.reason} / ${retryCheck.reason}`,
  );
}

function extractText(response: Anthropic.Message): string {
  const block = response.content.find((entry) => entry.type === 'text');
  const raw = block && block.type === 'text' ? block.text : '';
  // Strip wrapping quotes if the model added any.
  return raw
    .trim()
    .replace(/^["'‘’“”]+/, '')
    .replace(/["'‘’“”]+$/, '')
    .trim();
}

/**
 * Deterministic fallback. Used when the model is unreachable or when
 * the API key is missing. Each branch returns a line that already
 * passes the restraint layer.
 */
function fallbackReflection(telling: string): string {
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

function pickByHash(seed: string, options: readonly string[]): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash + seed.charCodeAt(i)) % 1_000_000;
  }
  return options[hash % options.length];
}

function jsonReply(payload: ReflectorPayload): Response {
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
