import { z } from 'zod';

import { KNOWN_TONES, type Tone } from '@/lib/draft';
import {
  CHOREOGRAPHY_VERSION,
  generateMomentId,
  type Moment,
} from '@/lib/moment';
import { slugifyName } from '@/lib/recipient';
import { sendMoment } from '@/lib/workflows/send-moment';

export const runtime = 'edge';

/**
 * Create a Moment. Builds the immutable Moment object from the
 * request payload and hands the rest of the work to the sendMoment
 * workflow, which composes Memory Archive + Communication agents.
 *
 * Always returns a coherent { id, shareUrl, linkActive } response.
 * linkActive=false when KV is unconfigured.
 */

const RequestSchema = z.object({
  recipientDisplayName: z.string().trim().min(1).max(80),
  recipientSlug: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1).max(600),
  emotion: z.string().trim().max(40).default(''),
  tone: z.string().trim().max(20).default(''),
  secondaryTone: z.string().trim().max(20).default(''),
  anchors: z.array(z.string().trim().min(1).max(80)).max(6).default([]),
  senderDeviceId: z.string().trim().min(8).max(128),
});

function normaliseTone(input: string): Tone {
  return KNOWN_TONES.includes(input as Tone) ? (input as Tone) : '';
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  const parsed = RequestSchema.safeParse(raw);
  if (!parsed.success) return jsonError('Invalid input', 400);

  const data = parsed.data;
  const id = generateMomentId();
  const moment: Moment = {
    id,
    recipientDisplayName: data.recipientDisplayName,
    recipientSlug:
      data.recipientSlug && data.recipientSlug.trim().length > 0
        ? data.recipientSlug.trim().toLowerCase()
        : slugifyName(data.recipientDisplayName),
    message: data.message,
    emotion: data.emotion as Moment['emotion'],
    tone: normaliseTone(data.tone),
    secondaryTone: normaliseTone(data.secondaryTone),
    anchors: data.anchors.slice(0, 4).map((a) => a.toLowerCase()),
    createdAt: Date.now(),
    senderDeviceId: data.senderDeviceId,
    choreographyVersion: CHOREOGRAPHY_VERSION,
  };

  const origin = new URL(req.url).origin;
  const result = await sendMoment({ moment, origin });

  return jsonReply({
    id: result.id,
    shareUrl: result.shareUrl,
    linkActive: result.linkActive,
  });
}

function jsonReply(payload: {
  id: string;
  shareUrl: string;
  linkActive: boolean;
}): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
