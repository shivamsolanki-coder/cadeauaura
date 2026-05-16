import { z } from 'zod';

import { reflectAgent } from '@/lib/agents/emotion';

export const runtime = 'edge';

/**
 * Thin wrapper around the Emotion Agent's reflect sub-agent. The
 * existing client (lib/api/ai.ts → fetchReflection) speaks this
 * shape — { text, source } — so we keep it stable while the actual
 * logic lives in lib/agents/emotion.ts.
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
  if (!parsed.success) return jsonError('Invalid input', 400);

  const result = await reflectAgent.run({ telling: parsed.data.telling });
  if (!result.ok) return jsonError(result.reason, 500);

  return jsonReply({
    text: result.data.text,
    source: result.source === 'model' ? 'model' : 'fallback',
  });
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
