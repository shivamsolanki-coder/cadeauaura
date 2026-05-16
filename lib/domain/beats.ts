/**
 * Reveal beats — the structured choreography the Surprise Script
 * Agent produces. The renderer at /r/[id] walks the array in order
 * and pairs each beat with a CSS-only transition.
 *
 * Keep this domain shape stable. choreographyVersion is the lever for
 * breaking changes: a moment created with v1 always renders with the
 * v1 interpreter, even if the engine ships v2.
 *
 * Three beat types are enough for the current cinematic surface:
 *
 *   envelope  the sealed state with a subtitle + CTA
 *   reveal    the opened card carrying the message
 *   sign-off  the closing italic line beneath the card
 */

export type BeatType = 'envelope' | 'reveal' | 'sign-off';

export interface Beat {
  type: BeatType;
  /** Optional text payload. For envelope: subtitle. For sign-off: closing line. */
  text?: string;
  /** Animation duration in ms. For envelope: fade-out. For reveal: card-in. */
  durationMs?: number;
  /** CTA label. Only used by envelope beats. */
  ctaLabel?: string;
}

export interface BeatSequence {
  beats: Beat[];
  choreographyVersion: number;
}

export function isBeatSequence(value: unknown): value is BeatSequence {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<BeatSequence>;
  return (
    Array.isArray(v.beats) &&
    typeof v.choreographyVersion === 'number' &&
    v.beats.every(
      (b) =>
        b &&
        typeof b === 'object' &&
        typeof b.type === 'string' &&
        (b.type === 'envelope' || b.type === 'reveal' || b.type === 'sign-off'),
    )
  );
}
