/**
 * Memory Archive Agent — single owner of all memory side effects.
 *
 * Three sub-agents:
 *
 *   recallProfileAgent  read a recipient's stored profile by deviceId+slug
 *   rememberProfileAgent merge a fresh observation into the profile
 *   archiveMomentAgent  persist an immutable Moment to KV
 *
 * Every memory read or write the rest of the system performs should
 * flow through one of these. Routes thin-wrap them; workflows compose
 * them. The persistence helpers in lib/persistence/* are the only
 * thing that touches KV directly.
 */

import type { Tone } from '@/lib/draft';
import type { Moment } from '@/lib/moment';
import {
  getProfile,
  recordProfile,
  type ProfileObservation,
} from '@/lib/persistence/profiles';
import {
  getMoment,
  putMoment,
  type PutMomentResult,
} from '@/lib/persistence/moments';
import { slugifyName, type RecipientProfile } from '@/lib/recipient';

import { ok, fail } from './runner';
import type { Agent } from './types';

// ── Recall a recipient profile ─────────────────────────────────────────────

export interface RecallProfileInput {
  deviceId: string;
  slug: string;
}

export interface RecallProfileOutput {
  profile: RecipientProfile | null;
}

export const recallProfileAgent: Agent<RecallProfileInput, RecallProfileOutput> = {
  name: 'recall-profile',
  async run(input) {
    const deviceId = input.deviceId?.trim();
    if (!deviceId || deviceId.length < 8) return fail('deviceId required');
    const slug = slugifyName(input.slug ?? '');
    if (!slug) return ok({ profile: null }, 'fallback');

    const profile = await getProfile(deviceId, slug);
    return ok({ profile }, profile ? 'cache' : 'fallback');
  },
};

// ── Remember (merge) a profile observation ─────────────────────────────────

export interface RememberProfileInput {
  deviceId: string;
  displayName: string;
  anchors: string[];
  tone: Tone;
}

export interface RememberProfileOutput {
  profile: RecipientProfile;
}

export const rememberProfileAgent: Agent<
  RememberProfileInput,
  RememberProfileOutput
> = {
  name: 'remember-profile',
  async run(input) {
    const deviceId = input.deviceId?.trim();
    if (!deviceId || deviceId.length < 8) return fail('deviceId required');
    const displayName = input.displayName?.trim();
    if (!displayName) return fail('displayName required');
    const slug = slugifyName(displayName);
    if (!slug) return fail('slug derivable from displayName required');

    const observation: ProfileObservation = {
      displayName,
      anchors: Array.isArray(input.anchors) ? input.anchors.slice(0, 8) : [],
      tone: input.tone ?? '',
    };
    const merged = await recordProfile(deviceId, slug, observation);
    return ok({ profile: merged }, 'cache');
  },
};

// ── Archive a moment ───────────────────────────────────────────────────────

export interface ArchiveMomentInput {
  moment: Moment;
}

export interface ArchiveMomentOutput extends PutMomentResult {
  id: string;
}

export const archiveMomentAgent: Agent<ArchiveMomentInput, ArchiveMomentOutput> = {
  name: 'archive-moment',
  async run(input) {
    if (!input.moment || !input.moment.id) return fail('moment.id required');
    const result = await putMoment(input.moment);
    return ok({ id: input.moment.id, linkActive: result.linkActive }, 'cache');
  },
};

// ── Recall a moment by id ──────────────────────────────────────────────────

export interface RecallMomentInput {
  id: string;
}

export interface RecallMomentOutput {
  moment: Moment | null;
}

export const recallMomentAgent: Agent<RecallMomentInput, RecallMomentOutput> = {
  name: 'recall-moment',
  async run(input) {
    if (!input.id) return ok({ moment: null }, 'fallback');
    const moment = await getMoment(input.id);
    return ok({ moment }, moment ? 'cache' : 'fallback');
  },
};
