/**
 * Moment persistence. Moments are immutable once written; this module
 * exposes the read + write paths and never an in-place update.
 *
 * Only the Memory Archive Agent should call into this — and even the
 * agent only writes during the explicit "create moment" flow.
 */

import { isKVConfigured, kv } from '@/lib/kv';
import { momentKey, type Moment } from '@/lib/moment';

export async function getMoment(id: string): Promise<Moment | null> {
  if (!id) return null;
  try {
    return await kv.get<Moment>(momentKey(id));
  } catch {
    return null;
  }
}

export interface PutMomentResult {
  linkActive: boolean;
}

/**
 * Persist a Moment to KV when possible. Returns linkActive=false when
 * KV is unconfigured or the write fails, so the calling workflow can
 * tell the sender truthfully whether the link will resolve.
 */
export async function putMoment(moment: Moment): Promise<PutMomentResult> {
  if (!isKVConfigured) return { linkActive: false };
  try {
    await kv.set(momentKey(moment.id), moment);
    return { linkActive: true };
  } catch {
    return { linkActive: false };
  }
}
