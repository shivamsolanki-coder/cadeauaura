/**
 * Client-side wrapper for the plan endpoint. Thin by design — the
 * server already validates input and falls back deterministically.
 */

import type { Tone } from '@/lib/draft';
import type { Plan } from '@/lib/domain/plan';

export interface PlanInput {
  recipientName: string;
  anchors: string[];
  tone: Tone;
  secondaryTone: Tone;
  emotion: string;
}

export interface PlanResult {
  plan: Plan;
  source: 'model' | 'fallback';
}

export async function fetchPlan(input: PlanInput): Promise<PlanResult | null> {
  const res = await fetch('/api/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipientName: input.recipientName,
      anchors: input.anchors,
      tone: input.tone === '' ? null : input.tone,
      secondaryTone: input.secondaryTone === '' ? null : input.secondaryTone,
      emotion: input.emotion,
    }),
  });
  if (!res.ok) return null;
  return (await res.json()) as PlanResult;
}
