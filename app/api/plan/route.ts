import { z } from 'zod';

import { planMoment } from '@/lib/workflows/plan-moment';

export const runtime = 'edge';

/**
 * Plan a moment. Thin wrapper over the planMoment workflow, which
 * itself wraps the Planning Agent. Returns { plan, source } where
 * source distinguishes model output from deterministic fallback.
 */

const ToneSchema = z.enum([
  'vague',
  'warm',
  'specific',
  'grief',
  'distance',
  'hurt',
]);

const RequestSchema = z.object({
  recipientName: z.string().trim().min(1).max(80),
  anchors: z.array(z.string().trim().min(1).max(80)).max(6).optional(),
  tone: ToneSchema.nullable().optional(),
  secondaryTone: ToneSchema.nullable().optional(),
  emotion: z.string().trim().max(40).optional(),
  occasion: z.string().trim().max(80).optional(),
});

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  const parsed = RequestSchema.safeParse(raw);
  if (!parsed.success) return jsonError('Invalid input', 400);

  const result = await planMoment(parsed.data);
  if (!result) return jsonError('plan unavailable', 500);

  return new Response(JSON.stringify(result), {
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
