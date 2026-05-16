import { z } from 'zod';

import {
  recallProfileAgent,
  rememberProfileAgent,
} from '@/lib/agents/memory';
import { KNOWN_TONES, type Tone } from '@/lib/draft';
import { slugifyName, type RecipientProfile } from '@/lib/recipient';

export const runtime = 'edge';

/**
 * Recipient profile endpoint — thin wrapper over the Memory Archive
 * Agent.
 *
 *   GET  /api/recipient/[slug]?device=<id>
 *     → { profile: RecipientProfile | null }
 *
 *   PUT  /api/recipient/[slug]
 *     Body: { deviceId, displayName, anchors, tone }
 *     → { profile: RecipientProfile }
 *
 * Never 401s. When KV is unconfigured the route still returns a
 * coherent shape so the UI can degrade silently.
 */

const TONE_VALUES = KNOWN_TONES.filter((t): t is Exclude<Tone, ''> => t !== '');

const PutSchema = z.object({
  deviceId: z.string().trim().min(8).max(128),
  displayName: z.string().trim().min(1).max(80),
  anchors: z.array(z.string().trim().min(1).max(80)).max(8),
  tone: z.enum(TONE_VALUES as [Exclude<Tone, ''>, ...Exclude<Tone, ''>[]]),
});

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug: rawSlug } = await context.params;
  const slug = slugifyName(decodeURIComponent(rawSlug));
  const url = new URL(req.url);
  const deviceId = url.searchParams.get('device')?.trim() ?? '';

  const result = await recallProfileAgent.run({ deviceId, slug });
  const profile: RecipientProfile | null = result.ok
    ? result.data.profile
    : null;
  return jsonReply({ profile });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  const parsed = PutSchema.safeParse(raw);
  if (!parsed.success) return jsonError('Invalid input', 400);

  const { slug: rawSlug } = await context.params;
  const slug = slugifyName(decodeURIComponent(rawSlug));
  if (!slug) return jsonError('Invalid slug', 400);

  // displayName drives the slug downstream — keep them aligned.
  const { deviceId, displayName, anchors, tone } = parsed.data;

  const result = await rememberProfileAgent.run({
    deviceId,
    displayName,
    anchors,
    tone,
  });

  if (!result.ok) return jsonError(result.reason, 400);
  return jsonReply({ profile: result.data.profile });
}

function jsonReply(payload: { profile: RecipientProfile | null }): Response {
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
