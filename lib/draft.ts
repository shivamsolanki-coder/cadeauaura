/**
 * Shared draft model.
 *
 * The Draft is the single source of truth for what the sender is
 * building. It lives in component state while they are on /create,
 * is mirrored to localStorage on every change, and is read back by
 * /create/preview and /r/demo when they render the cinematic
 * surface. Every consumer should import from this file rather than
 * re-declaring the shape locally.
 */

export const EMOTIONS = [
  'Love',
  'Thanks',
  'Pride',
  'Apology',
  'Welcome',
  'Just because',
] as const;

export type Emotion = (typeof EMOTIONS)[number];

export type Tone = '' | 'vague' | 'warm' | 'specific' | 'grief' | 'hurt';

export const KNOWN_TONES: readonly Tone[] = [
  'vague',
  'warm',
  'specific',
  'grief',
  'hurt',
];

export interface Draft {
  recipientName: string;
  emotion: Emotion | '';
  senderTelling: string;
  message: string;
  anchors: string[];
  tone: Tone;
}

export const STORAGE_KEY = 'cadeauaura.draft.v1';

export const emptyDraft: Draft = {
  recipientName: '',
  emotion: '',
  senderTelling: '',
  message: '',
  anchors: [],
  tone: '',
};

/**
 * Reads the persisted draft from localStorage. Defensive against an
 * older v1 shape that did not include anchors / tone: missing fields
 * hydrate to the empty defaults. Unknown tone values coerce to ''.
 */
export function readDraft(): Draft {
  if (typeof window === 'undefined') return emptyDraft;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyDraft;
    const parsed = JSON.parse(raw) as Partial<Draft>;
    return {
      ...emptyDraft,
      ...parsed,
      anchors: Array.isArray(parsed.anchors) ? parsed.anchors.slice(0, 4) : [],
      tone: KNOWN_TONES.includes(parsed.tone as Tone)
        ? (parsed.tone as Tone)
        : '',
    };
  } catch {
    return emptyDraft;
  }
}

export function writeDraft(draft: Draft) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // localStorage may be disabled or full; silent failure is correct here.
  }
}
