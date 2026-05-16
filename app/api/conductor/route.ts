import { z } from 'zod';

import { AGENT_NAMES, getAgent, isAgentName } from '@/lib/agents';
import type { AgentContext, AgentResult } from '@/lib/agents/types';

export const runtime = 'edge';

/**
 * Conductor — single dispatch endpoint for the agent stack.
 *
 *   POST /api/conductor
 *   Body: { agent: AgentName, input: unknown, deviceId?: string }
 *
 * Looks up the named agent in the registry, hands it the input, and
 * returns the AgentResult unchanged. The contract is deliberately
 * thin: one agent call per request. Multi-step orchestration lives
 * in lib/workflows/*, not here.
 *
 * Unknown agents return 400. Agent failures return 200 with { ok:
 * false, reason } so clients can render fallbacks without an
 * exception layer.
 */

const RequestSchema = z.object({
  agent: z.enum(AGENT_NAMES as unknown as [string, ...string[]]),
  input: z.unknown(),
  deviceId: z.string().trim().min(8).max(128).optional(),
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

  const { agent: agentName, input, deviceId } = parsed.data;
  if (!isAgentName(agentName)) {
    return jsonError(`Unknown agent: ${agentName}`, 400);
  }

  const agent = getAgent(agentName);
  if (!agent) {
    return jsonError(`Unknown agent: ${agentName}`, 400);
  }

  const context: AgentContext = { deviceId };

  let result: AgentResult<unknown>;
  try {
    result = await agent.run(input, context);
  } catch (err) {
    result = {
      ok: false,
      reason: err instanceof Error ? err.message : 'agent threw',
    };
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ ok: false, reason: message }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
