/**
 * Human-in-the-loop boundaries.
 *
 * The constants below codify what CadeauAura must never do
 * automatically, and what requires explicit sender confirmation
 * before the system takes any action. Other modules import from this
 * file when they need to reason about an action's safety class —
 * the source of truth is here, not scattered across route handlers.
 *
 * Categories:
 *
 *   REQUIRES_EXPLICIT_CONFIRMATION
 *     Actions that require an unambiguous human tap before they fire.
 *     The UI must surface a real button; an agent CTA inside a draft
 *     does not count.
 *
 *   NEVER_AUTOMATIC
 *     Actions that must NEVER happen on a timer, on a webhook, on a
 *     schedule, on a model response, or on a fallback path. These
 *     are the brand's moral boundary: an agent making any of these
 *     decisions on its own would break trust permanently.
 *
 *   IDEMPOTENT_MEMORY_WRITES
 *     Internal memory operations that can run silently and repeatedly
 *     without confirmation, because they are merge-only and the
 *     sender can delete the resulting record at any time.
 */

export const REQUIRES_EXPLICIT_CONFIRMATION = [
  'moment.create',
  'moment.share-external',
  'moment.schedule',
  'channel.send',
  'partner.contact',
  'payment.charge',
  'profile.delete',
  'moment.delete',
] as const;

export const NEVER_AUTOMATIC = [
  'channel.send',
  'partner.contact',
  'payment.charge',
  'recipient.contact',
  'public.post',
  'agent.recursive-self-call',
] as const;

export const IDEMPOTENT_MEMORY_WRITES = [
  'profile.merge',
  'moment.archive',
  'audit.append',
] as const;

export type ConfirmationKey = (typeof REQUIRES_EXPLICIT_CONFIRMATION)[number];
export type AutomaticForbidden = (typeof NEVER_AUTOMATIC)[number];
export type IdempotentWrite = (typeof IDEMPOTENT_MEMORY_WRITES)[number];

export function requiresConfirmation(action: string): action is ConfirmationKey {
  return (REQUIRES_EXPLICIT_CONFIRMATION as readonly string[]).includes(action);
}

export function isNeverAutomatic(action: string): action is AutomaticForbidden {
  return (NEVER_AUTOMATIC as readonly string[]).includes(action);
}

export function isIdempotentMemoryWrite(action: string): action is IdempotentWrite {
  return (IDEMPOTENT_MEMORY_WRITES as readonly string[]).includes(action);
}

/**
 * Production assertion used inside any code path that wants to take a
 * potentially-unsafe action. Throws if the action is one that must
 * never happen automatically. This is belt-and-braces — the design
 * already routes these through explicit UI taps — but the throw
 * catches future regressions.
 */
export function assertNotAutomatic(action: string): void {
  if (isNeverAutomatic(action)) {
    throw new Error(
      `Safety boundary violation: ${action} must require explicit human confirmation.`,
    );
  }
}
