/**
 * Client-side wrappers for the moment endpoints. Intentionally thin —
 * the server handles validation, defaults, and graceful degradation.
 */

import type { Moment } from '@/lib/moment';

export interface CreateMomentInput {
  recipientDisplayName: string;
  recipientSlug: string;
  message: string;
  emotion: string;
  tone: string;
  secondaryTone: string;
  anchors: string[];
  senderDeviceId: string;
}

export interface CreateMomentResult {
  id: string;
  shareUrl: string;
  /**
   * False when KV is not configured server-side — the link is returned
   * for completeness but will not resolve. The UI surfaces this
   * truthfully rather than silently shipping a dead URL.
   */
  linkActive: boolean;
}

export async function createMoment(
  input: CreateMomentInput,
): Promise<CreateMomentResult> {
  const res = await fetch('/api/moment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`create moment failed: ${res.status}`);
  }
  return (await res.json()) as CreateMomentResult;
}

export async function fetchMoment(id: string): Promise<Moment | null> {
  const res = await fetch(`/api/moment/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { moment: Moment | null };
  return data.moment;
}
