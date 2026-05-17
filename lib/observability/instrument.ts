/**
 * Agent instrumentation.
 *
 * Wraps an `agent.run()` call with three production-safe layers:
 *
 *   1. Timing — every call gets a duration_ms entry on the structured
 *      log line.
 *   2. Optional timeout — callers can cap how long an agent may take.
 *      If the deadline is hit, the wrapper returns an AgentResult
 *      failure rather than letting the caller hang.
 *   3. Logging — success/failure, source ('model' | 'fallback' |
 *      'cache'), reason string on failure. No personal content.
 *
 * Use this inside workflows and inside route handlers to standardise
 * how agents are observed.
 */

import type { Agent, AgentResult } from '@/lib/agents/types';

import { generateTraceId, log } from './log';

export interface InstrumentOptions {
  /** Logical scope, e.g. 'workflow.send-moment' or 'route.compose'. */
  scope: string;
  /** Optional parent trace ID. A new one is minted if omitted. */
  traceId?: string;
  /** Hard timeout for the agent run in milliseconds. */
  timeoutMs?: number;
}

export async function instrumentRun<I, O>(
  agent: Agent<I, O>,
  input: I,
  opts: InstrumentOptions,
): Promise<AgentResult<O>> {
  const traceId = opts.traceId ?? generateTraceId();
  const start = Date.now();

  try {
    const result = opts.timeoutMs
      ? await raceWithTimeout(agent.run(input), opts.timeoutMs, agent.name)
      : await agent.run(input);

    log({
      level: result.ok ? 'info' : 'warn',
      scope: opts.scope,
      traceId,
      durationMs: Date.now() - start,
      data: {
        agent: agent.name,
        ok: result.ok,
        source: result.ok ? result.source : null,
        reason: result.ok ? null : result.reason,
      },
    });

    return result;
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'agent threw';
    log({
      level: 'error',
      scope: opts.scope,
      traceId,
      durationMs: Date.now() - start,
      data: { agent: agent.name, ok: false, reason },
    });
    return { ok: false, reason };
  }
}

async function raceWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  agentName: string,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`agent ${agentName} timed out after ${timeoutMs} ms`));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err: unknown) => {
        clearTimeout(timer);
        reject(err instanceof Error ? err : new Error('agent threw'));
      });
  });
}
