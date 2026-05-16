import { z } from 'zod';

import { KNOWN_TONES, type Tone } from '@/lib/draft';
import { isKVConfigured, kv } from '@/lib/kv';
import {
  CHOREOGRAPHY_VERSION,
  generateMomentId,
  momentKey,
  type Moment,
} from '@/lib/moment';
import { slugifyName } from '@/lib/recipient';

export const runtime = 'edge';

/**
 * Create a Moment. Generates an id, normalises the payload, writes to
 * KV when configured, and always returns a coherent { id, shareUrl,
 * linkActive } response so the preview UI can render something useful
 * even in environments where KV is missing.
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

  let linkActive = isKVConfigured;
  if (linkActive) {
    try {
      await kv.set(momentKey(id), moment);
    } catch {
      linkActive = false;
    }
  }

  const origin = new URL(req.url).origin;
  const shareUrl = `${origin}/r/${id}`;

  return jsonReply({ id, shareUrl, linkActive });
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
