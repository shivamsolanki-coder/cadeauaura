/**
 * Structured logger.
 *
 * Every agent run, every workflow step, and every external action
 * goes through here. We emit single-line JSON to stdout/stderr so
 * Vercel's log ingest picks it up as structured data without any
 * extra configuration.
 *
 * No personal content (telling, message, anchors, recipient name) is
 * ever included in a log payload. Only metadata: agent name, model
 * source, success/failure flag, duration, optional reason string.
 *
 * Trace IDs are generated via Web Crypto when available — works in
 * the edge runtime, the Node runtime, and the browser. Falls through
 * to a timestamped pseudo-random ID otherwise.
 */

export type LogLevel = 'info' | 'warn' | 'error';

export interface LogEvent {
  ts: string;
  level: LogLevel;
  scope: string;
  traceId?: string;
  durationMs?: number;
  data?: Record<string, unknown>;
}

interface LogInput {
  level: LogLevel;
  scope: string;
  traceId?: string;
  durationMs?: number;
  data?: Record<string, unknown>;
}

export function log(event: LogInput): void {
  const enriched: LogEvent = {
    ts: new Date().toISOString(),
    level: event.level,
    scope: event.scope,
    ...(event.traceId ? { traceId: event.traceId } : {}),
    ...(event.durationMs !== undefined ? { durationMs: event.durationMs } : {}),
    ...(event.data ? { data: event.data } : {}),
  };

  const line = safeStringify(enriched);
  if (event.level === 'error') {
    console.error(line);
  } else if (event.level === 'warn') {
    console.warn(line);
  } else {
    console.log(line);
  }
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return JSON.stringify({ level: 'error', scope: 'observability', data: { serialiseError: true } });
  }
}

export function generateTraceId(): string {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.randomUUID === 'function'
  ) {
    return globalThis.crypto.randomUUID();
  }
  // Last-resort fallback — only hit on very old runtimes.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
