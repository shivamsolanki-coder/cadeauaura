/**
 * Client-side fetch wrappers for the AI routes.
 *
 * These do nothing clever — they POST JSON, parse JSON, normalise
 * the response so the hooks don't have to repeat that boilerplate.
 * Server-side restraint + fallback already guarantee a usable
 * payload, so error handling here is intentionally thin.
 */

import { KNOWN_TONES, type Tone } from '@/lib/draft';

export async function fetchReflection(
  telling: string,
  attempt: number,
): Promise<string> {
  const res = await fetch('/api/reflect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telling, attempt }),
  });
  if (!res.ok) throw new Error('reflect failed');
  const data = (await res.json()) as { text: string };
  return data.text;
}

export interface FollowUpResponse {
  followUp: string;
  anchors: string[];
  tone: Tone;
  secondaryTone: Tone;
}

export async function fetchFollowUp(
  telling: string,
  reflection: string,
): Promise<FollowUpResponse> {
  const res = await fetch('/api/follow-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telling, reflection }),
  });
  if (!res.ok) throw new Error('follow-up failed');
  const data = (await res.json()) as {
    followUp: string;
    anchors: string[];
    tone: string;
    secondaryTone: string | null;
  };
  const tone: Tone = KNOWN_TONES.includes(data.tone as Tone)
    ? (data.tone as Tone)
    : '';
  const secondaryTone: Tone = KNOWN_TONES.includes(data.secondaryTone as Tone)
    ? (data.secondaryTone as Tone)
    : '';
  return {
    followUp: data.followUp,
    anchors: Array.isArray(data.anchors) ? data.anchors.slice(0, 4) : [],
    tone,
    secondaryTone,
  };
}

export interface ComposerInput {
  recipientName: string;
  telling: string;
  anchors: string[];
  tone: Tone;
  emotion: string;
  attempt: number;
}

export async function fetchComposerDrafts(
  input: ComposerInput,
): Promise<string[]> {
  const res = await fetch('/api/compose', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipientName: input.recipientName,
      telling: input.telling,
      anchors: input.anchors,
      tone: input.tone === '' ? null : input.tone,
      emotion: input.emotion,
      attempt: input.attempt,
    }),
  });
  if (!res.ok) throw new Error('compose failed');
  const data = (await res.json()) as { drafts: string[] };
  return Array.isArray(data.drafts) ? data.drafts.slice(0, 3) : [];
}
