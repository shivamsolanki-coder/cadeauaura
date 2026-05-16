/**
 * sendMoment workflow.
 *
 * Composes three agents in explicit sequence when a sender ships a
 * moment:
 *
 *   1. Memory Archive Agent — archiveMomentAgent persists the
 *      immutable Moment to KV.
 *   2. Communication Agent — shareArtefactsAgent builds the wa.me
 *      deep link (plus future email / ICS scaffolds).
 *   3. Memory Archive Agent — rememberProfileAgent merges the new
 *      observation into the recipient's profile so future moments
 *      for the same person benefit from accumulated anchors and
 *      tone history.
 *
 * No autonomous side effects. The caller (the /api/moment route)
 * decides when to invoke this. Profile remembering is best-effort —
 * a failure there does not break the send.
 */

import {
  archiveMomentAgent,
  rememberProfileAgent,
  shareArtefactsAgent,
} from '@/lib/agents';
import type { Moment } from '@/lib/moment';

export interface SendMomentInput {
  moment: Moment;
  /** The origin (e.g. https://cadeauaura.vercel.app) used to compose the share URL. */
  origin: string;
}

export interface SendMomentResult {
  id: string;
  shareUrl: string;
  linkActive: boolean;
  whatsappShareUrl: string | null;
}

export async function sendMoment(
  input: SendMomentInput,
): Promise<SendMomentResult> {
  const { moment, origin } = input;
  const shareUrl = `${origin}/r/${moment.id}`;

  // 1. Persist the moment. linkActive=false when KV is unconfigured;
  //    the caller will surface this to the sender truthfully.
  const archive = await archiveMomentAgent.run({ moment });
  const linkActive = archive.ok ? archive.data.linkActive : false;

  // 2. Build outbound artefacts (wa.me link today; email + ICS scaffolded).
  const artefacts = await shareArtefactsAgent.run({
    shareUrl,
    recipientName: moment.recipientDisplayName,
    channels: ['whatsapp'],
  });
  const whatsappShareUrl =
    artefacts.ok ? artefacts.data.whatsapp : null;

  // 3. Best-effort: remember the recipient. Silent on failure.
  if (moment.tone && moment.senderDeviceId) {
    await rememberProfileAgent.run({
      deviceId: moment.senderDeviceId,
      displayName: moment.recipientDisplayName,
      anchors: moment.anchors,
      tone: moment.tone,
    });
  }

  return {
    id: moment.id,
    shareUrl,
    linkActive,
    whatsappShareUrl,
  };
}
