import { z } from 'zod';

import { deepenAgent } from '@/lib/agents/emotion';

export const runtime = 'edge';

/**
 * Thin wrapper around the Emotion Agent's deepen sub-agent. The
 * existing client (lib/api/ai.ts → fetchFollowUp) speaks this
 * shape — { followUp, anchors, tone, secondaryTone, source } — so we
 * keep it stable while the agent module owns the logic.
 */

const RequestSchema = z.object({
  telling: z.string().trim().min(1).max(2000),
  reflection: z.string().trim().min(1).max(500).optional(),
});

interface FollowUpPayload {
  followUp: string;
  anchors: string[];
  tone: string;
  secondaryTone: string | null;
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
  if (!parsed.success) return jsonError('Invalid input', 400);

  const result = await deepenAgent.run({
    telling: parsed.data.telling,
    reflection: parsed.data.reflection,
  });
  if (!result.ok) return jsonError(result.reason, 500);

  return jsonReply({
    followUp: result.data.followUp,
    anchors: result.data.anchors,
    tone: result.data.tone,
    secondaryTone: result.data.secondaryTone,
    source: result.source === 'model' ? 'model' : 'fallback',
  });
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
