/**
 * Audit trail for real-world artefact production.
 *
 * The audit captures the moments that matter from a trust/operational
 * standpoint: moment creation, share-artefact generation, profile
 * writes, and (later) scheduled-reveal dispatches. It does NOT
 * capture telling text, message text, or recipient names — only
 * action, deviceId, target id, ok flag, and reason on failure.
 *
 * Storage is best-effort:
 *   - The audit ALWAYS logs to stdout via lib/observability/log so
 *     deployments without KV still have a recoverable trail.
 *   - When KV is configured, entries are appended to a per-day list
 *     under the key `audit:v1:YYYY-MM-DD`. The list is capped at 500
 *     entries per day so KV writes stay cheap and bounded.
 *   - A KV write failure never breaks the calling workflow.
 *
 * This is foundation, not a dashboard. Sender-facing audit surfaces
 * land in a later slice.
 */

import { kv } from '@/lib/kv';

import { generateTraceId, log } from './log';

export type AuditAction =
  | 'moment.create'
  | 'moment.share-artefacts'
  | 'profile.merge'
  | 'profile.read';

export interface AuditEntry {
  traceId: string;
  ts: string;
  action: AuditAction;
  deviceId?: string;
  target?: string;
  ok: boolean;
  reason?: string;
}

const AUDIT_KEY_PREFIX = 'audit:v1:';
const MAX_ENTRIES_PER_DAY = 500;

function dayKey(): string {
  return `${AUDIT_KEY_PREFIX}${new Date().toISOString().slice(0, 10)}`;
}

export interface RecordAuditInput {
  action: AuditAction;
  deviceId?: string;
  target?: string;
  ok: boolean;
  reason?: string;
  traceId?: string;
}

export async function recordAuditEntry(input: RecordAuditInput): Promise<void> {
  const entry: AuditEntry = {
    traceId: input.traceId ?? generateTraceId(),
    ts: new Date().toISOString(),
    action: input.action,
    deviceId: input.deviceId,
    target: input.target,
    ok: input.ok,
    reason: input.reason,
  };

  // Always log — deployments without KV still get an audit trail.
  log({
    level: entry.ok ? 'info' : 'warn',
    scope: 'audit',
    traceId: entry.traceId,
    data: {
      action: entry.action,
      target: entry.target,
      ok: entry.ok,
      reason: entry.reason,
    },
  });

  // Best-effort persistence. KV no-op store returns null silently.
  try {
    const existing = (await kv.get<AuditEntry[]>(dayKey())) ?? [];
    existing.push(entry);
    await kv.set(dayKey(), existing.slice(-MAX_ENTRIES_PER_DAY));
  } catch {
    // Persistence is best-effort; we already logged.
  }
}
