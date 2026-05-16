/**
 * Thin abstraction over the Vercel KV (Upstash Redis) REST API.
 *
 * Calls go directly to the REST endpoint, so we avoid taking
 * `@vercel/kv` as a hard dependency. When `KV_REST_API_URL` and
 * `KV_REST_API_TOKEN` are not present in the environment the module
 * exports a no-op store. The recipient routes degrade gracefully:
 * fetch returns null, save is silent, and the UI behaves as if the
 * sender has never written to this person before.
 *
 * Values are JSON-serialised on the way in and parsed on the way out
 * so callers can store plain TypeScript objects.
 */

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

export interface KVStore {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  del(key: string): Promise<void>;
}

const noop: KVStore = {
  async get() {
    return null;
  },
  async set() {
    /* silent */
  },
  async del() {
    /* silent */
  },
};

async function command(args: unknown[]): Promise<unknown> {
  if (!KV_URL || !KV_TOKEN) return null;
  const res = await fetch(KV_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`kv ${args[0]} failed: ${res.status}`);
  const data = (await res.json()) as { result?: unknown };
  return data.result ?? null;
}

const rest: KVStore = {
  async get<T>(key: string): Promise<T | null> {
    const raw = (await command(['GET', key])) as string | null;
    if (raw == null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  async set<T>(key: string, value: T): Promise<void> {
    await command(['SET', key, JSON.stringify(value)]);
  },
  async del(key: string): Promise<void> {
    await command(['DEL', key]);
  },
};

export const kv: KVStore = KV_URL && KV_TOKEN ? rest : noop;

export const isKVConfigured = Boolean(KV_URL && KV_TOKEN);
