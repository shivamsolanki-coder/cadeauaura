import Anthropic from '@anthropic-ai/sdk';

/**
 * Thin Anthropic SDK wrapper. Each route in app/api/ai/* imports
 * `getClaude()` and calls it directly. We deliberately do not wrap
 * the SDK in a framework — the SDK is already small enough.
 *
 * Model choice is centralised here so we have one place to update
 * when the lineup shifts.
 */

export const MODELS = {
  /** Low-latency, streaming. Reflections, classifications, refinements. */
  haiku: 'claude-haiku-4-5-20251001',
  /** Voice-quality compositions: message drafts, gift directions. */
  sonnet: 'claude-sonnet-4-6',
} as const;

export type ModelName = (typeof MODELS)[keyof typeof MODELS];

let cachedClient: Anthropic | null = null;

/**
 * Returns a memoised Anthropic client, or null when no API key is
 * configured in the environment.
 *
 * Callers must handle the null case. Routes that depend on the model
 * return a calm fallback response (or a 503) rather than crashing.
 * This lets the rest of the app build and run locally even when no
 * key is present.
 */
export function getClaude(): Anthropic | null {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  cachedClient = new Anthropic({ apiKey });
  return cachedClient;
}

/** True when the runtime has the credentials to call Claude. */
export function isClaudeConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}
