import { kv } from '@/lib/kv';
import { isValidMomentId, momentKey, type Moment } from '@/lib/moment';

export const runtime = 'edge';

/**
 * Fetch a Moment by id. Always returns 200 with { moment: Moment | null }
 * so the client doesn't have to discriminate between "not found" and
 * "transport error" — both render the same calm not-found state.
 */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id || !isValidMomentId(id)) {
    return jsonReply(null);
  }

  try {
    const moment = await kv.get<Moment>(momentKey(id));
    return jsonReply(moment);
  } catch {
    return jsonReply(null);
  }
}

function jsonReply(moment: Moment | null): Response {
  return new Response(JSON.stringify({ moment }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
