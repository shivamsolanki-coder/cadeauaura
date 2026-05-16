/**
 * RecipientProfile persistence. Thin module over the KV store with
 * the merge semantics living in lib/recipient.ts. The Memory Archive
 * Agent is the only thing that should call into this — keeping reads
 * and writes funnelled through one path keeps the schema honest.
 */

import { kv } from '@/lib/kv';
import {
  emptyProfile,
  mergeIntoProfile,
  profileKey,
  type RecipientProfile,
} from '@/lib/recipient';
import type { Tone } from '@/lib/draft';

export async function getProfile(
  deviceId: string,
  slug: string,
): Promise<RecipientProfile | null> {
  if (!deviceId || !slug) return null;
  try {
    return await kv.get<RecipientProfile>(profileKey(deviceId, slug));
  } catch {
    return null;
  }
}

export interface ProfileObservation {
  displayName: string;
  anchors: string[];
  tone: Tone;
}

/**
 * Merge a fresh observation into the stored profile and persist.
 * Returns the merged value even if persistence is unconfigured —
 * callers can still render a coherent response.
 */
export async function recordProfile(
  deviceId: string,
  slug: string,
  observation: ProfileObservation,
): Promise<RecipientProfile> {
  const existing =
    (await getProfile(deviceId, slug)) ??
    emptyProfile(slug, observation.displayName);
  const merged = mergeIntoProfile(existing, observation);
  try {
    await kv.set(profileKey(deviceId, slug), merged);
  } catch {
    // KV write failures degrade to "best-effort merge in response only".
  }
  return merged;
}
