/**
 * Recipient profile — the server-side memory of who the sender has
 * written to before. Profiles are keyed by (deviceId, slug) where the
 * slug is a normalised, lowercased version of the recipient's name as
 * the sender typed it.
 *
 * Anchors and tones accumulate across moments so the composer can
 * lean on what the sender has already told us about this person
 * without repeatedly re-deriving it from each new telling.
 */

import type { Tone } from '@/lib/draft';

export interface RecipientProfile {
  slug: string;
  displayName: string;
  /** Unique anchors accumulated across all moments for this recipient. */
  anchors: string[];
  /** Tones across past moments, most recent last. Capped at 10. */
  toneHistory: Tone[];
  /** Number of moments the sender has created for this person. */
  momentsCount: number;
  /** Epoch ms of the last write. */
  lastTouchAt: number;
}

export function emptyProfile(slug: string, displayName: string): RecipientProfile {
  return {
    slug,
    displayName,
    anchors: [],
    toneHistory: [],
    momentsCount: 0,
    lastTouchAt: 0,
  };
}

/**
 * Lowercases, collapses whitespace, drops anything that isn't a
 * letter, number, hyphen, or single space. The result is what we use
 * as the KV key suffix — predictable across renderings of the same
 * name even if the sender capitalises differently or adds a stray
 * trailing space.
 */
export function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9À-ɏͰ-᳿Ḁ-῿\s-]/g, '')
    .trim();
}

export function profileKey(deviceId: string, slug: string): string {
  return `recipient:${deviceId}:${slug}`;
}

/**
 * Merge a fresh observation (from one new moment) into an existing
 * profile. Anchors are appended uniquely, tones get a trimmed FIFO,
 * counters increment.
 */
export function mergeIntoProfile(
  existing: RecipientProfile,
  observation: {
    displayName: string;
    anchors: string[];
    tone: Tone;
  },
): RecipientProfile {
  const seen = new Set(existing.anchors);
  const nextAnchors = [...existing.anchors];
  for (const anchor of observation.anchors) {
    const trimmed = anchor.trim().toLowerCase();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    nextAnchors.push(trimmed);
  }

  const nextToneHistory = [...existing.toneHistory];
  if (observation.tone) {
    nextToneHistory.push(observation.tone);
    if (nextToneHistory.length > 10) nextToneHistory.shift();
  }

  return {
    ...existing,
    displayName: observation.displayName || existing.displayName,
    anchors: nextAnchors.slice(0, 24),
    toneHistory: nextToneHistory,
    momentsCount: existing.momentsCount + 1,
    lastTouchAt: Date.now(),
  };
}
