/**
 * Helpers shared by every agent.
 *
 * ok / fail wrap an AgentResult. withRestraint runs a piece of human-
 * facing copy through the deterministic voice gate and throws on
 * failure so the caller's catch can convert that to an AgentResult.
 */

import { passesRestraint, type RestraintProfile } from '@/lib/ai/restraint';

import type { AgentFailure, AgentResult, AgentSource } from './types';

export function ok<O>(data: O, source: AgentSource): AgentResult<O> {
  return { ok: true, data, source };
}

export function fail(reason: string): AgentFailure {
  return { ok: false, reason };
}

/**
 * Throws if the given text does not pass the restraint gate. Returns
 * the text untouched on success. Use this inside an agent's run()
 * body so failure naturally converts to an AgentResult via the
 * surrounding try/catch.
 */
export function withRestraint(text: string, profile: RestraintProfile): string {
  const check = passesRestraint(text, profile);
  if (!check.ok) {
    throw new Error(`restraint: ${check.reason}`);
  }
  return text;
}
