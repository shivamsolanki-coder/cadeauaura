/**
 * The Listening workflow.
 *
 * Composes reflect → deepen in a single call. Used by callers that
 * want both halves of the Emotion Agent's output at once (server-
 * side smoke tests, eval harness, future composite endpoints).
 *
 * Routes that need per-step UX (typewriter playback between the
 * reflection and the follow-up) still call the agents individually
 * from their hooks — that's a UX requirement, not a workflow break.
 */

import { deepenAgent, reflectAgent } from '@/lib/agents';
import type { DeepenOutput } from '@/lib/agents/emotion';
import { instrumentRun } from '@/lib/observability/instrument';
import { generateTraceId } from '@/lib/observability/log';

export interface ListenInput {
  telling: string;
  traceId?: string;
}

export interface ListenResult {
  reflection: string;
  deepen: DeepenOutput;
  traceId: string;
}

export async function reflectAndDeepen(
  input: ListenInput,
): Promise<ListenResult | null> {
  const traceId = input.traceId ?? generateTraceId();

  const reflect = await instrumentRun(
    reflectAgent,
    { telling: input.telling },
    { scope: 'workflow.listen', traceId, timeoutMs: 12_000 },
  );
  if (!reflect.ok) return null;

  const deepen = await instrumentRun(
    deepenAgent,
    { telling: input.telling, reflection: reflect.data.text },
    { scope: 'workflow.listen', traceId, timeoutMs: 12_000 },
  );
  if (!deepen.ok) return null;

  return {
    reflection: reflect.data.text,
    deepen: deepen.data,
    traceId,
  };
}
