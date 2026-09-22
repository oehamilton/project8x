export const ADMIN_SESSION_KEY = 'p8x.admin.unlocked';

const HASH_PATTERN = /^[a-f0-9]{64}$/;

export async function sha256Hex(value) {
  const data = new TextEncoder().encode(String(value ?? ''));
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/** Length-independent compare so a short configured hash does not return early. */
export function timingSafeEqual(left, right) {
  const a = String(left);
  const b = String(right);
  const length = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;
  for (let i = 0; i < length; i += 1) {
    const aCode = i < a.length ? a.charCodeAt(i) : 0;
    const bCode = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= aCode ^ bCode;
  }
  return mismatch === 0;
}

export function normalizePasswordHash(hash) {
  const normalized = String(hash || '').trim().toLowerCase();
  return HASH_PATTERN.test(normalized) ? normalized : '';
}

/**
 * @returns {Promise<{ ok: true } | { ok: false, reason: 'unconfigured' | 'denied' }>}
 */
export async function verifyPassphrase(passphrase, expectedHash) {
  const normalized = normalizePasswordHash(expectedHash);
  if (!normalized) {
    return { ok: false, reason: 'unconfigured' };
  }
  const actual = await sha256Hex(passphrase ?? '');
  if (!timingSafeEqual(actual, normalized)) {
    return { ok: false, reason: 'denied' };
  }
  return { ok: true };
}

export function readAdminSession() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function writeAdminSession(unlocked) {
  try {
    if (unlocked) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch {
    // Private mode or a blocked storage API still allows the in-memory gate.
  }
}
