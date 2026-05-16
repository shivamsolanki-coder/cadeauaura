/**
 * Plan — the structured shape the Planning Agent produces.
 *
 * Plans are intentionally minimal. CadeauAura is not a project tool;
 * a plan is one sentence of shape (momentType + durationHint) plus
 * three to five short key beats. Anything longer would betray the
 * brand. The renderer surfaces plans as plain typographic content,
 * never as a Gantt or checklist.
 */

/** A discrete set of moment archetypes. Keep this small. */
export type MomentType =
  | 'letter'
  | 'reveal'
  | 'series'
  | 'unboxing'
  | 'gesture';

export const MOMENT_TYPES: readonly MomentType[] = [
  'letter',
  'reveal',
  'series',
  'unboxing',
  'gesture',
];

export interface Plan {
  momentType: MomentType;
  /** Human-readable duration, e.g. "a single quiet moment". */
  durationHint: string;
  /** Three to five short beats. Each beat is a short phrase, not a paragraph. */
  keyBeats: string[];
}

export function isMomentType(value: string): value is MomentType {
  return (MOMENT_TYPES as readonly string[]).includes(value);
}
