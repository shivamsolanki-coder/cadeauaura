/**
 * Deterministic voice guard.
 *
 * Every string produced by the AI passes through this gate before it
 * reaches the surface. The point is not to add personality — the
 * point is to subtract anything that breaks the existing one.
 *
 * The rules below are the same rules that govern human-written copy
 * across the site. They are intentionally strict.
 */

/** Adjectives that signal marketplace copywriting and never appear on CadeauAura. */
const BANNED_ADJECTIVES = [
  'premium',
  'curated',
  'meaningful',
  'thoughtful',
  'unique',
  'perfect',
  'amazing',
  'special',
  'exquisite',
  'exclusive',
  'luxurious',
  'beautiful',
  'wonderful',
  'incredible',
];

/** Phrases that betray the AI's identity to the user. */
const FORBIDDEN_SELF_REFERENCE = [
  'as an ai',
  'as a language model',
  "i'm an ai",
  'i am an ai',
  "i'm sorry, but i",
  'i cannot',
  "i can't help",
  'as your assistant',
  'language model',
];

export type RestraintProfile = 'reflector' | 'composer' | 'gift-direction';

interface RestraintLimits {
  maxSentences: number;
  maxWordsPerSentence: number;
  maxTotalWords: number;
}

const LIMITS: Record<RestraintProfile, RestraintLimits> = {
  // One quiet mirror sentence. Never more.
  reflector: { maxSentences: 1, maxWordsPerSentence: 22, maxTotalWords: 22 },
  // Up to three short, contained sentences.
  composer: { maxSentences: 3, maxWordsPerSentence: 20, maxTotalWords: 55 },
  // A single phrase. Should feel discovered, not described.
  'gift-direction': { maxSentences: 1, maxWordsPerSentence: 12, maxTotalWords: 12 },
};

export interface RestraintResult {
  ok: boolean;
  reason?: string;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.?])\s+(?=[A-Z"‘“])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function containsBannedAdjective(text: string): string | null {
  const lower = text.toLowerCase();
  for (const word of BANNED_ADJECTIVES) {
    const pattern = new RegExp(`\\b${word}\\b`, 'i');
    if (pattern.test(lower)) return word;
  }
  return null;
}

function containsSelfReference(text: string): string | null {
  const lower = text.toLowerCase();
  for (const phrase of FORBIDDEN_SELF_REFERENCE) {
    if (lower.includes(phrase)) return phrase;
  }
  return null;
}

/**
 * Returns { ok: true } if the candidate string fits CadeauAura's
 * voice. Otherwise returns a short, human-readable reason that the
 * Composer can be re-prompted with.
 */
export function passesRestraint(
  candidate: string,
  profile: RestraintProfile,
): RestraintResult {
  const trimmed = candidate.trim();

  if (!trimmed) {
    return { ok: false, reason: 'empty output' };
  }

  if (trimmed.includes('!')) {
    return { ok: false, reason: 'contains an exclamation mark' };
  }

  const banned = containsBannedAdjective(trimmed);
  if (banned) {
    return { ok: false, reason: `contains the word "${banned}"` };
  }

  const selfRef = containsSelfReference(trimmed);
  if (selfRef) {
    return { ok: false, reason: `contains forbidden self-reference "${selfRef}"` };
  }

  const limits = LIMITS[profile];
  const sentences = splitSentences(trimmed);

  if (sentences.length > limits.maxSentences) {
    return {
      ok: false,
      reason: `${sentences.length} sentences; maximum is ${limits.maxSentences}`,
    };
  }

  for (const sentence of sentences) {
    const words = countWords(sentence);
    if (words > limits.maxWordsPerSentence) {
      return {
        ok: false,
        reason: `a sentence runs ${words} words; maximum is ${limits.maxWordsPerSentence}`,
      };
    }
  }

  if (countWords(trimmed) > limits.maxTotalWords) {
    return {
      ok: false,
      reason: `total length is over ${limits.maxTotalWords} words`,
    };
  }

  return { ok: true };
}
