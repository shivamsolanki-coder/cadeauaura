/**
 * buildReveal workflow.
 *
 * Given a Moment, ask the Surprise Script Agent for the beat
 * sequence. Used by /r/[id] when the moment has no pre-baked beats
 * (currently always — beats are not yet persisted on Moment). Kept
 * as a workflow so future versions can compose more agents (e.g.
 * read plan from KV, fetch sender preferences) without changing the
 * call site.
 */

import { surpriseAgent } from '@/lib/agents';
import type { BeatSequence } from '@/lib/domain/beats';
import type { Plan } from '@/lib/domain/plan';
import type { Moment } from '@/lib/moment';

export interface BuildRevealInput {
  moment: Moment;
  /** Optional plan; when present, momentType modifies choreography. */
  plan?: Plan | null;
}

export async function buildReveal(
  input: BuildRevealInput,
): Promise<BeatSequence | null> {
  const result = await surpriseAgent.run({
    message: input.moment.message,
    tone: input.moment.tone,
    plan: input.plan ?? null,
  });
  if (!result.ok) return null;
  return result.data.sequence;
}
