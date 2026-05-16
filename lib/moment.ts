/**
 * The Moment is the immutable artefact a sender publishes — the thing
 * a recipient will open at /r/<id>. It is stored in KV, never in
 * localStorage, and never edited in place; "editing" a moment after
 * send would create a new Moment with a new id.
 *
 * choreographyVersion lets the reveal renderer evolve safely: a v1
 * moment will always be rendered with v1 choreography rules even if
 * the engine ships v2 later.
 */

import type { Emotion, Tone } from '@/lib/draft';

/** Bumped only when the reveal renderer's behaviour changes. */
export const CHOREOGRAPHY_VERSION = 1;

export interface Moment {
  id: string;
  recipientDisplayName: string;
  recipientSlug: string;
  message: string;
  emotion: Emotion | '';
  tone: Tone;
  secondaryTone: Tone;
  anchors: string[];
  createdAt: number;
  senderDeviceId: string;
  choreographyVersion: number;
}

/**
 * URL-safe alphabet that drops visually ambiguous characters
 * (0/O, 1/I/l). 8 chars from a 57-symbol space gives ~111 trillion
 * possibilities — collision risk is negligible at any realistic scale.
 */
const ID_ALPHABET =
  'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

export function generateMomentId(length = 8): string {
  const bytes = new Uint8Array(length);
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  let id = '';
  for (let i = 0; i < length; i += 1) {
    id += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  }
  return id;
}

export function momentKey(id: string): string {
  return `moment:${id}`;
}

/** Cheap shape check used by the reveal page's not-found handling. */
export function isValidMomentId(id: string): boolean {
  return /^[A-Za-z0-9]{4,16}$/.test(id);
}
