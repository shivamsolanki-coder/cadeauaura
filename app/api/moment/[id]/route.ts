import { recallMomentAgent } from '@/lib/agents/memory';
import { isValidMomentId, type Moment } from '@/lib/moment';

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

  const result = await recallMomentAgent.run({ id });
  return jsonReply(result.ok ? result.data.moment : null);
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
