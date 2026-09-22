export const DEFAULT_OFFLINE_MESSAGE = 'Demo is offline.';
export const DEFAULT_INTERNAL_MESSAGE =
  'The demo is up on the internal network. There is no public URL.';

const STATUS_TIMEOUT_MS = 8000;

function fetchInit(extra) {
  const init = {
    cache: 'no-store',
    credentials: 'omit',
    redirect: 'follow',
    ...extra,
  };
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    init.signal = AbortSignal.timeout(STATUS_TIMEOUT_MS);
  }
  return init;
}

export function isAcceptableStatusUrl(value) {
  const url = String(value || '').trim();
  if (!url) return false;
  if (url.startsWith('/') && !url.startsWith('//')) return true;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:') return true;
    const local = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    return parsed.protocol === 'http:' && local;
  } catch {
    return false;
  }
}

export function isHttpsDemoUrl(value) {
  try {
    const parsed = new URL(String(value || '').trim());
    return parsed.protocol === 'https:' && parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

function readMessage(data) {
  if (!data || typeof data.message !== 'string') return '';
  return data.message.trim();
}

function readTimestamp(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return value.trim();
}

function blankOffline() {
  return {
    state: 'offline',
    message: DEFAULT_OFFLINE_MESSAGE,
    updatedAt: '',
    ttlEndsAt: '',
  };
}

/**
 * Schema v1.
 * Open demo only when live is true and demo_url is a non-empty https URL.
 * live true with a null (or otherwise non-public) demo_url is internal-only.
 * live false is offline. ttl_ends_at is informational and does not hide the link.
 */
export function interpretStatus(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return blankOffline();
  if (data.schema_version !== undefined && data.schema_version !== 1) return blankOffline();

  const updatedAt = readTimestamp(data.updated_at);
  const ttlEndsAt = readTimestamp(data.ttl_ends_at);
  const message = readMessage(data);

  if (data.live !== true) {
    return {
      state: 'offline',
      message: message || DEFAULT_OFFLINE_MESSAGE,
      updatedAt,
      ttlEndsAt,
    };
  }

  const demoUrl = typeof data.demo_url === 'string' ? data.demo_url.trim() : '';
  if (isHttpsDemoUrl(demoUrl)) {
    return {
      state: 'live',
      demoUrl,
      message,
      updatedAt,
      ttlEndsAt,
    };
  }

  return {
    state: 'internal',
    message: message || DEFAULT_INTERNAL_MESSAGE,
    updatedAt,
    ttlEndsAt,
  };
}

export async function loadDemoState(statusUrl, options = {}) {
  const fetchImpl = options.fetchImpl || fetch;

  if (!isAcceptableStatusUrl(statusUrl)) return blankOffline();

  try {
    const response = await fetchImpl(String(statusUrl).trim(), fetchInit({ method: 'GET' }));
    if (!response || !response.ok) return blankOffline();
    return interpretStatus(await response.json());
  } catch {
    return blankOffline();
  }
}
