/**
 * Planning Agent — proposes the shape of a moment.
 *
 * Input: recipient name + emotional context. Output: a small Plan
 * object with momentType, durationHint, and 3–5 key beats. AI selects
 * within a restrained set of momentTypes and fills in tone-aware
 * beats; deterministic fallback covers every tone.
 *
 * This agent is opt-in from the UI side (the sender taps "Plan this
 * moment"). It never fires automatically.
 */

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { getClaude, MODELS } from '@/lib/ai/claude';
import { PLANNING_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { passesRestraint } from '@/lib/ai/restraint';
import type { Tone } from '@/lib/draft';
import {
  MOMENT_TYPES,
  type MomentType,
  type Plan,
} from '@/lib/domain/plan';

import { fail, ok } from './runner';
import type { Agent } from './types';

export interface PlanningInput {
  recipientName: string;
  anchors?: string[];
  tone?: Tone | null;
  secondaryTone?: Tone | null;
  emotion?: string;
  occasion?: string;
}

export interface PlanningOutput {
  plan: Plan;
}

const MomentTypeSchema = z.enum(
  MOMENT_TYPES as unknown as [MomentType, ...MomentType[]],
);

const ModelPayloadSchema = z.object({
  momentType: MomentTypeSchema,
  durationHint: z.string().trim().min(1).max(80),
  keyBeats: z.array(z.string().trim().min(1).max(60)).min(2).max(6),
});

type PlanningTone = Exclude<Tone, ''>;

export const planningAgent: Agent<PlanningInput, PlanningOutput> = {
  name: 'plan',
  async run(input) {
    const recipientName = input.recipientName?.trim() ?? '';
    if (!recipientName) return fail('recipientName required');

    const tone: PlanningTone | null = isPlanningTone(input.tone)
      ? input.tone
      : null;
    const anchors = Array.isArray(input.anchors) ? input.anchors : [];
    const emotion = input.emotion?.trim() ?? '';
    const occasion = input.occasion?.trim() ?? '';

    const client = getClaude();
    if (!client) {
      return ok({ plan: fallbackPlan(tone, anchors) }, 'fallback');
    }

    try {
      const plan = await callPlanning(client, {
        recipientName,
        anchors,
        tone,
        emotion,
        occasion,
      });
      return ok({ plan }, 'model');
    } catch {
      return ok({ plan: fallbackPlan(tone, anchors) }, 'fallback');
    }
  },
};

function isPlanningTone(tone: unknown): tone is PlanningTone {
  return (
    typeof tone === 'string' &&
    ['vague', 'warm', 'specific', 'grief', 'distance', 'hurt'].includes(tone)
  );
}

interface CallPlanningArgs {
  recipientName: string;
  anchors: string[];
  tone: PlanningTone | null;
  emotion: string;
  occasion: string;
}

async function callPlanning(
  client: Anthropic,
  args: CallPlanningArgs,
): Promise<Plan> {
  const lines: string[] = [];
  lines.push(`Recipient name: ${args.recipientName}`);
  if (args.tone) lines.push(`Primary tone: ${args.tone}`);
  if (args.anchors.length > 0) {
    lines.push(`Anchors surfaced from the telling: ${args.anchors.join(' / ')}`);
  }
  if (args.emotion) {
    lines.push(
      `The sender wants the recipient to feel: ${args.emotion.toLowerCase()}`,
    );
  }
  if (args.occasion) lines.push(`Occasion: ${args.occasion}`);

  const response = await client.messages.create({
    model: MODELS.sonnet,
    max_tokens: 500,
    system: PLANNING_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: lines.join('\n\n') }],
  });

  const block = response.content.find((entry) => entry.type === 'text');
  const text = block && block.type === 'text' ? block.text.trim() : '';
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error('no JSON payload');

  const candidate: unknown = JSON.parse(text.slice(start, end + 1));
  const parsed = ModelPayloadSchema.parse(candidate);

  // Each beat must pass a soft restraint check using the gift-direction
  // profile (12-word, single-sentence cap) since beats are short phrases.
  for (const beat of parsed.keyBeats) {
    const check = passesRestraint(beat, 'gift-direction');
    if (!check.ok) {
      throw new Error(`plan beat failed restraint: ${check.reason}`);
    }
  }

  return {
    momentType: parsed.momentType,
    durationHint: parsed.durationHint,
    keyBeats: parsed.keyBeats.slice(0, 5),
  };
}

// ── Deterministic fallback ─────────────────────────────────────────────────

const FALLBACK_PLANS: Record<PlanningTone, Plan> = {
  grief: {
    momentType: 'letter',
    durationHint: 'a single quiet moment',
    keyBeats: [
      'open in their own time',
      'a sentence held in a card',
      'no expectation of reply',
    ],
  },
  distance: {
    momentType: 'letter',
    durationHint: 'a small thread across the time',
    keyBeats: [
      'a private link sent without notice',
      'a paragraph, no preamble',
      'nothing asked of them',
    ],
  },
  hurt: {
    momentType: 'gesture',
    durationHint: 'a single offering',
    keyBeats: [
      'something they can ignore',
      'no apology assumed',
      'sent and forgotten',
    ],
  },
  warm: {
    momentType: 'letter',
    durationHint: 'a single quiet moment',
    keyBeats: [
      'a private reveal, just for them',
      'a few sentences in your voice',
      'something they can return to',
    ],
  },
  specific: {
    momentType: 'reveal',
    durationHint: 'one slow opening',
    keyBeats: [
      'an envelope they choose to open',
      'a sentence on what they did',
      'a quiet sign-off',
    ],
  },
  vague: {
    momentType: 'letter',
    durationHint: 'a single starting note',
    keyBeats: [
      'a small piece of writing',
      'something to begin with',
      'open whenever they want',
    ],
  },
};

function fallbackPlan(tone: PlanningTone | null, _anchors: string[]): Plan {
  return FALLBACK_PLANS[tone ?? 'warm'];
}
