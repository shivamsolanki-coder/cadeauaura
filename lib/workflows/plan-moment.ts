/**
 * planMoment workflow.
 *
 * Single-agent wrapper today — invokes the Planning Agent. Kept as a
 * workflow so the call site is stable when Planning grows into a
 * multi-step flow later (e.g. Planning → Surprise Script preview).
 */

import { planningAgent } from '@/lib/agents';
import type { Plan } from '@/lib/domain/plan';
import type { Tone } from '@/lib/draft';

export interface PlanMomentInput {
  recipientName: string;
  anchors?: string[];
  tone?: Tone | null;
  secondaryTone?: Tone | null;
  emotion?: string;
  occasion?: string;
}

export interface PlanMomentResult {
  plan: Plan;
  source: 'model' | 'fallback';
}

export async function planMoment(
  input: PlanMomentInput,
): Promise<PlanMomentResult | null> {
  const result = await planningAgent.run(input);
  if (!result.ok) return null;
  return {
    plan: result.data.plan,
    source: result.source === 'model' ? 'model' : 'fallback',
  };
}
