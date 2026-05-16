/**
 * Communication Agent — the "how does this moment leave the studio?"
 * capability.
 *
 *   composeAgent       generate 3 message drafts (Sonnet→Haiku downgrade)
 *   shareArtefactsAgent build outbound artefacts: wa.me link + scaffolds
 *
 * The Composer half preserves the existing /api/compose contract
 * exactly (drafts: string[], source: 'model' | 'fallback'). The
 * share-artefact half is new but additive — current callers do not
 * have to use it.
 *
 * Email and ICS support are scaffolded as null returns for now so
 * future agents and workflows can call into them without changing
 * the shape. Real email + ICS land in a later Phase 3.x slice.
 */

import type Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import { getClaude, MODELS } from '@/lib/ai/claude';
import { COMPOSER_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { passesRestraint } from '@/lib/ai/restraint';
import type { Tone } from '@/lib/draft';
import { buildWhatsAppShare } from '@/lib/whatsapp';

import { fail, ok } from './runner';
import type { Agent } from './types';

// ── Compose ────────────────────────────────────────────────────────────────

const ToneSchema = z.enum([
  'vague',
  'warm',
  'specific',
  'grief',
  'distance',
  'hurt',
]);

const ModelPayloadSchema = z.object({
  drafts: z.array(z.string().trim().min(1).max(600)).min(1).max(6),
});

type ComposerTone = z.infer<typeof ToneSchema>;

export interface ComposeInput {
  recipientName: string;
  telling: string;
  anchors?: string[];
  tone?: Tone | null;
  emotion?: string;
  /** 0 for the first try, increments on each "Try different words". */
  attempt?: number;
}

export interface ComposeOutput {
  drafts: string[];
}

/**
 * Cost-safe model selection. The first few tries get Sonnet because
 * quality matters most while the sender is still deciding whether to
 * trust the engine. Past that, repeated regenerates are usually the
 * sender hunting for variety — Haiku gives that at a fraction of the
 * cost without burning real money on diminishing returns.
 */
const SONNET_ATTEMPT_CEILING = 2;

export const composeAgent: Agent<ComposeInput, ComposeOutput> = {
  name: 'compose',
  async run(input) {
    const recipientName = input.recipientName?.trim() ?? '';
    if (!recipientName) return fail('recipientName required');
    const telling = input.telling?.trim() ?? '';
    if (telling.length < 1 || telling.length > 2000) {
      return fail('telling must be 1–2000 characters');
    }

    const safeTone: ComposerTone | null = isComposerTone(input.tone)
      ? input.tone
      : null;
    const anchors = Array.isArray(input.anchors) ? input.anchors : [];
    const attempt = typeof input.attempt === 'number' ? input.attempt : 0;
    const emotion = input.emotion?.trim() ?? '';

    const client = getClaude();
    if (!client) {
      return ok(
        { drafts: fallbackDrafts(recipientName, safeTone, anchors) },
        'fallback',
      );
    }

    try {
      const modelDrafts = await callComposer(client, {
        recipientName,
        telling,
        anchors,
        tone: safeTone,
        emotion,
        attempt,
      });

      const passing = modelDrafts.filter(
        (text) => passesRestraint(text, 'composer').ok,
      );

      const filled = topUpToThree(passing, recipientName, safeTone, anchors);

      return ok(
        { drafts: filled },
        passing.length > 0 ? 'model' : 'fallback',
      );
    } catch {
      return ok(
        { drafts: fallbackDrafts(recipientName, safeTone, anchors) },
        'fallback',
      );
    }
  },
};

function isComposerTone(tone: unknown): tone is ComposerTone {
  return (
    typeof tone === 'string' &&
    ['vague', 'warm', 'specific', 'grief', 'distance', 'hurt'].includes(tone)
  );
}

interface CallComposerArgs {
  recipientName: string;
  telling: string;
  anchors: string[];
  tone: ComposerTone | null;
  emotion: string;
  attempt: number;
}

async function callComposer(
  client: Anthropic,
  args: CallComposerArgs,
): Promise<string[]> {
  const lines: string[] = [];
  lines.push(`Recipient name: ${args.recipientName}`);
  lines.push(`What the sender wrote about them:\n${args.telling}`);
  if (args.anchors.length > 0) {
    lines.push(`Anchors that surfaced: ${args.anchors.join(' / ')}`);
  }
  if (args.tone) {
    lines.push(`Emotional tone: ${args.tone}`);
  }
  if (args.emotion) {
    lines.push(
      `The sender wants the recipient to feel: ${args.emotion.toLowerCase()}`,
    );
  }

  const model =
    args.attempt > SONNET_ATTEMPT_CEILING ? MODELS.haiku : MODELS.sonnet;

  const response = await client.messages.create({
    model,
    max_tokens: 700,
    system: COMPOSER_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: lines.join('\n\n') }],
  });

  const block = response.content.find((entry) => entry.type === 'text');
  const text = block && block.type === 'text' ? block.text.trim() : '';
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < 0) {
    throw new Error('no JSON payload in composer response');
  }

  const candidate: unknown = JSON.parse(text.slice(start, end + 1));
  const parsed = ModelPayloadSchema.parse(candidate);
  return parsed.drafts.slice(0, 3);
}

function topUpToThree(
  passing: string[],
  recipientName: string,
  tone: ComposerTone | null,
  anchors: string[],
): string[] {
  if (passing.length >= 3) return passing.slice(0, 3);
  const fallback = fallbackDrafts(recipientName, tone, anchors);
  const out = [...passing];
  for (const candidate of fallback) {
    if (out.length >= 3) break;
    if (out.includes(candidate)) continue;
    out.push(candidate);
  }
  return out.slice(0, 3);
}

function fallbackDrafts(
  recipientName: string,
  tone: ComposerTone | null,
  anchors: string[],
): string[] {
  const name = recipientName.trim();
  const anchorOne = anchors[0] ?? '';
  const anchorPhrase = anchorOne ? `'${anchorOne}'` : 'the small things';

  const sets: Record<ComposerTone, string[]> = {
    grief: [
      `I think about you when I do the small things you would have noticed. You are still part of how I move through the day.`,
      `${name}, you are not as far away as the calendar makes you sound. Thank you for what you left in me.`,
      `Some days I forget, and then ${anchorPhrase} comes back and I remember everything at once.`,
    ],
    distance: [
      `I have been meaning to reach out for a while. Not for any reason exactly. Just because you crossed my mind.`,
      `${name}, it has been a long time. I am not asking for anything. I just wanted you to know I think of you.`,
      `Some of what we lost is still in me, I think. ${anchorPhrase}. Take this however you want.`,
    ],
    hurt: [
      `I am not sure how to say this clearly. There was something you got right, and I will hold that. The rest I am still working out.`,
      `${name}, I have been carrying this for a while. I do not need an answer. I just needed to say it out loud once.`,
      `What you did is not the whole story. I remember ${anchorPhrase}, and I am keeping that part.`,
    ],
    vague: [
      `There is more to say than I can manage today. But I wanted to send something. So this is the start.`,
      `${name}, I have been meaning to write. I am not sure how to begin, so I am just beginning.`,
      `Some of what I feel about you is hard to put into words. ${anchorPhrase} keeps coming to mind, though.`,
    ],
    warm: [
      `Thank you for being someone I do not have to explain myself to. I see what you carry, even when you do not.`,
      `${name}, I am better because of you. I do not say it often enough, so I am saying it now.`,
      `You make a quieter version of me feel possible. ${anchorPhrase} stays with me more than you know.`,
    ],
    specific: [
      `${name}, I have been meaning to tell you for a while. ${anchorPhrase} stays with me more than you know. Thank you for that.`,
      `What you did was not a small thing, even if you treated it like one. I remember it. I keep remembering it.`,
      `I think about ${anchorPhrase} more than I let on. You probably do not know how much it shaped me.`,
    ],
  };

  const key: ComposerTone = tone ?? 'warm';
  return sets[key];
}

// ── Share artefacts ────────────────────────────────────────────────────────

export interface ShareArtefactsInput {
  shareUrl: string;
  recipientName?: string;
  /** Channels the workflow wants artefacts for. */
  channels?: Array<'whatsapp' | 'email' | 'ics'>;
}

export interface ShareArtefactsOutput {
  whatsapp: string | null;
  email: { subject: string; body: string } | null;
  ics: string | null;
}

/**
 * Builds the outbound artefacts for a moment. Currently:
 *
 *   - whatsapp: always built (wa.me deep link)
 *   - email:    scaffolded to null — real generator lands in 3.x
 *   - ics:      scaffolded to null — real generator lands in 3.x
 *
 * The return shape is stable so future workflows can opt into channels
 * without the signature changing.
 */
export const shareArtefactsAgent: Agent<
  ShareArtefactsInput,
  ShareArtefactsOutput
> = {
  name: 'share-artefacts',
  async run(input) {
    if (!input.shareUrl) return fail('shareUrl required');
    const channels = new Set(input.channels ?? ['whatsapp']);

    return ok(
      {
        whatsapp: channels.has('whatsapp')
          ? buildWhatsAppShare(input.shareUrl, input.recipientName)
          : null,
        email: null,
        ics: null,
      },
      'cache',
    );
  },
};
