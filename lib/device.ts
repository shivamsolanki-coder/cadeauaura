/**
 * Per-device anonymous identity.
 *
 * CadeauAura has no accounts yet, so the recipient memory needs a
 * stable handle for "this writer." A UUID minted on first visit and
 * stored in localStorage is enough: it survives reloads on the same
 * device, lets the server group a sender's recipient profiles, and
 * carries no PII.
 *
 * If localStorage is unavailable (private mode, SSR), the helper
 * returns a transient ID for that page render — the writer still
 * works, but memory will not persist across sessions.
 */

const DEVICE_KEY = 'cadeauaura.device.v1';

function randomId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for very old browsers: 16 random hex chars.
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function getDeviceId(): string {
  if (typeof window === 'undefined') return randomId();
  try {
    const existing = window.localStorage.getItem(DEVICE_KEY);
    if (existing) return existing;
    const fresh = randomId();
    window.localStorage.setItem(DEVICE_KEY, fresh);
    return fresh;
  } catch {
    return randomId();
  }
}
