/**
 * The Reveal workflow.
 *
 * Fetches a moment by id and asks the Surprise Script Agent to
 * generate the beat sequence for it. /r/[id] uses this to keep its
 * server component clean and to share instrumentation with the rest
 * of the agentic surface.
 *
 * The fallback path is deterministic: if either agent fails, the
 * caller can decide to render its own safe default sequence rather
 * than crashing the page.
 */

import { recallMomentAgent, surpriseAgent } from '@/lib/agents';
import type { BeatSequence } from '@/lib/domain/beats';
import type { Moment } from '@/lib/moment';
import { instrumentRun } from '@/lib/observability/instrument';
import { generateTraceId } from '@/lib/observability/log';

export interface RecallAndRevealInput {
  id: string;
  traceId?: string;
}

export interface RecallAndRevealResult {
  moment: Moment;
  sequence: BeatSequence;
  traceId: string;
}

export async function recallAndReveal(
  input: RecallAndRevealInput,
): Promise<RecallAndRevealResult | null> {
  const traceId = input.traceId ?? generateTraceId();

  const recall = await instrumentRun(
    recallMomentAgent,
    { id: input.id },
    { scope: 'workflow.recall-and-reveal', traceId, timeoutMs: 5_000 },
  );
  if (!recall.ok || !recall.data.moment) return null;

  const surprise = await instrumentRun(
    surpriseAgent,
    {
      message: recall.data.moment.message,
      tone: recall.data.moment.tone,
      plan: null,
    },
    { scope: 'workflow.recall-and-reveal', traceId, timeoutMs: 2_000 },
  );
  if (!surprise.ok) return null;

  return {
    moment: recall.data.moment,
    sequence: surprise.data.sequence,
    traceId,
  };
}
