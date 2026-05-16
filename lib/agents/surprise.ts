/**
 * Surprise Script Agent — generates the reveal choreography for a
 * moment.
 *
 * Deterministic by design. Beat templates live in code, indexed by
 * (tone × momentType). The agent picks the right template, fills in
 * the message and closing line, and returns a BeatSequence. No model
 * call. No animation chaos. No imperative loops.
 *
 * Future versions may add an AI hook to vary the sign-off line per
 * moment, but for v1 the choreography is fully deterministic — that
 * is the safest path to consistent feel on mobile.
 */

import { CHOREOGRAPHY_VERSION } from '@/lib/moment';
import type { Tone } from '@/lib/draft';
import type { MomentType, Plan } from '@/lib/domain/plan';
import type { BeatSequence, Beat } from '@/lib/domain/beats';

import { ok } from './runner';
import type { Agent } from './types';

export interface SurpriseInput {
  message: string;
  tone?: Tone | null;
  plan?: Plan | null;
}

export interface SurpriseOutput {
  sequence: BeatSequence;
}

type SurpriseTone = Exclude<Tone, ''>;

interface ToneTemplate {
  envelopeFadeMs: number;
  cardEnterMs: number;
  sealedSubtitle: string;
  ctaLabel: string;
  closingLine: string;
}

const TONE_TEMPLATES: Record<SurpriseTone, ToneTemplate> = {
  grief: {
    envelopeFadeMs: 1500,
    cardEnterMs: 1800,
    sealedSubtitle: 'Something quiet, for you',
    ctaLabel: 'When you are ready',
    closingLine: 'Held with care, for as long as you need.',
  },
  distance: {
    envelopeFadeMs: 1300,
    cardEnterMs: 1700,
    sealedSubtitle: 'A small thread, across the time',
    ctaLabel: 'Open it gently',
    closingLine: 'Sent in case there is still a thread.',
  },
  hurt: {
    envelopeFadeMs: 1200,
    cardEnterMs: 1600,
    sealedSubtitle: 'A small thing, for you',
    ctaLabel: 'When you are ready',
    closingLine: 'Sent without asking anything of you.',
  },
  warm: {
    envelopeFadeMs: 1000,
    cardEnterMs: 1400,
    sealedSubtitle: 'Something is waiting for you',
    ctaLabel: 'Open the moment',
    closingLine: 'Made for you, with care.',
  },
  specific: {
    envelopeFadeMs: 1000,
    cardEnterMs: 1400,
    sealedSubtitle: 'Something is waiting for you',
    ctaLabel: 'Open the moment',
    closingLine: 'Made for you, with care.',
  },
  vague: {
    envelopeFadeMs: 1000,
    cardEnterMs: 1400,
    sealedSubtitle: 'Something is waiting for you',
    ctaLabel: 'Open the moment',
    closingLine: 'Made for you, with care.',
  },
};

/**
 * MomentType modifiers nudge the base tone template without
 * replacing it. The defaults below keep the cinematic surface
 * consistent; new momentTypes can add nuance over time.
 */
function applyMomentTypeModifier(
  template: ToneTemplate,
  momentType: MomentType | undefined,
): ToneTemplate {
  if (!momentType) return template;
  switch (momentType) {
    case 'reveal':
      // Slightly longer fade on dedicated reveals.
      return { ...template, envelopeFadeMs: template.envelopeFadeMs + 100 };
    case 'gesture':
      // Gestures are quieter — shorter, no flourish.
      return {
        ...template,
        envelopeFadeMs: Math.max(800, template.envelopeFadeMs - 100),
        cardEnterMs: Math.max(1100, template.cardEnterMs - 200),
      };
    case 'unboxing':
    case 'series':
    case 'letter':
    default:
      return template;
  }
}

function buildSequence(template: ToneTemplate, message: string): BeatSequence {
  const beats: Beat[] = [
    {
      type: 'envelope',
      text: template.sealedSubtitle,
      durationMs: template.envelopeFadeMs,
      ctaLabel: template.ctaLabel,
    },
    {
      type: 'reveal',
      text: message,
      durationMs: template.cardEnterMs,
    },
    {
      type: 'sign-off',
      text: template.closingLine,
    },
  ];
  return { beats, choreographyVersion: CHOREOGRAPHY_VERSION };
}

function resolveTone(tone: Tone | null | undefined): SurpriseTone {
  if (
    tone === 'grief' ||
    tone === 'distance' ||
    tone === 'hurt' ||
    tone === 'warm' ||
    tone === 'specific' ||
    tone === 'vague'
  ) {
    return tone;
  }
  return 'warm';
}

export const surpriseAgent: Agent<SurpriseInput, SurpriseOutput> = {
  name: 'surprise',
  async run(input) {
    const message = (input.message ?? '').trim();
    const tone = resolveTone(input.tone);
    const base = TONE_TEMPLATES[tone];
    const template = applyMomentTypeModifier(base, input.plan?.momentType);
    const sequence = buildSequence(template, message);
    return ok({ sequence }, 'cache');
  },
};
