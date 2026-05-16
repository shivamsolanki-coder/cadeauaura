/**
 * Core agent contract.
 *
 * Every agent is a single stateless function: take an input, return a
 * result. The result is always a discriminated union — success carries
 * typed data + source, failure carries a short reason. There is no
 * exception model at the boundary; agents return failure rather than
 * throw so workflows can compose them cleanly.
 *
 * Agents are stateless. Persistence (recipient memory, moment archive)
 * lives in the persistence layer and is reached via context.deviceId.
 */

export interface AgentContext {
  /** Anonymous per-device handle used by memory-touching agents. */
  deviceId?: string;
  /** Forwarded cancellation signal. Most agents ignore it for now. */
  signal?: AbortSignal;
}

export type AgentSource = 'model' | 'fallback' | 'cache';

export interface AgentSuccess<O> {
  ok: true;
  data: O;
  source: AgentSource;
}

export interface AgentFailure {
  ok: false;
  reason: string;
}

export type AgentResult<O> = AgentSuccess<O> | AgentFailure;

export interface Agent<I, O> {
  /** Stable name used by the registry for dispatch and logging. */
  name: string;
  run(input: I, context?: AgentContext): Promise<AgentResult<O>>;
}
