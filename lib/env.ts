/**
 * Runtime environment validation.
 *
 * Centralises every `process.env` read so the rest of the codebase
 * works against a typed, validated snapshot — not raw strings that
 * might be empty, whitespace, or malformed URLs.
 *
 * The snapshot is computed once and memoised. Validation never
 * throws at module load (that would break edge bundles); callers
 * either inspect `configured` flags or call `assertProductionReady`
 * from a deployment health check.
 */

interface AnthropicEnv {
  configured: boolean;
  apiKey: string | null;
}

interface KVEnv {
  configured: boolean;
  url: string | null;
  token: string | null;
}

export interface EnvSnapshot {
  anthropic: AnthropicEnv;
  kv: KVEnv;
}

let cached: EnvSnapshot | null = null;

function trim(value: string | undefined): string | null {
  if (!value) return null;
  const t = value.trim();
  return t.length > 0 ? t : null;
}

function isHttpUrl(value: string | null): value is string {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

export function readEnv(): EnvSnapshot {
  if (cached) return cached;

  const apiKey = trim(process.env.ANTHROPIC_API_KEY);
  const kvUrlRaw = trim(process.env.KV_REST_API_URL);
  const kvUrl = isHttpUrl(kvUrlRaw) ? kvUrlRaw : null;
  const kvToken = trim(process.env.KV_REST_API_TOKEN);

  cached = {
    anthropic: {
      configured: Boolean(apiKey),
      apiKey,
    },
    kv: {
      configured: Boolean(kvUrl && kvToken),
      url: kvUrl,
      token: kvToken,
    },
  };
  return cached;
}

/**
 * Throws if any required production env vars are missing or malformed.
 * Use from a deployment health check or a /api/health route — never
 * from module load. Edge bundles must not crash on cold start because
 * of missing optional env.
 */
export function assertProductionReady(): void {
  const env = readEnv();
  const missing: string[] = [];
  if (!env.anthropic.configured) missing.push('ANTHROPIC_API_KEY');
  if (!env.kv.configured) missing.push('KV_REST_API_URL/KV_REST_API_TOKEN');
  if (missing.length > 0) {
    throw new Error(`Production env missing: ${missing.join(', ')}`);
  }
}
