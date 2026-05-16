'use client';

import { useCallback, useState } from 'react';

import { fetchPlan, type PlanInput } from '@/lib/api/plan';
import type { Plan } from '@/lib/domain/plan';

export interface UsePlanResult {
  plan: Plan | null;
  loading: boolean;
  trigger: (input: PlanInput) => Promise<void>;
  reset: () => void;
}

/**
 * Owns the plan-this-moment beat. Manual trigger only — the hook
 * never fires automatically. The parent decides when the conditions
 * are right (typically after composer drafts have surfaced).
 *
 * State is intentionally minimal: a single plan + loading. Failures
 * are silent — if the network fails, the sender just sees no plan.
 */
export function usePlan(): UsePlanResult {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);

  const trigger = useCallback(async (input: PlanInput) => {
    if (input.recipientName.trim().length === 0) return;
    setLoading(true);
    try {
      const result = await fetchPlan(input);
      if (result) setPlan(result.plan);
    } catch {
      // Silent — the sender's flow continues even if planning fails.
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPlan(null);
  }, []);

  return { plan, loading, trigger, reset };
}
