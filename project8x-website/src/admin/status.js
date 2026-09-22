export const DEFAULT_OFFLINE_MESSAGE = 'Demo is offline.';

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

function readUpdatedAt(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return value.trim();
}

function offlineResult(data) {
  return {
    state: 'offline',
    message: readMessage(data) || DEFAULT_OFFLINE_MESSAGE,
    updatedAt: readUpdatedAt(data && data.updated_at),
  };
}

/**
 * Map a status document to a live or offline view.
 * Live requires `live === true`, a non-empty https `demo_url`, and a
 * `ttl_ends_at` that is either absent or still in the future.
 */
export function interpretStatus(data, now = new Date()) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      state: 'offline',
      message: DEFAULT_OFFLINE_MESSAGE,
      updatedAt: '',
    };
  }

  if (data.live !== true) return offlineResult(data);

  if (data.ttl_ends_at) {
    const ends = new Date(data.ttl_ends_at);
    if (Number.isNaN(ends.getTime()) || ends.getTime() <= now.getTime()) {
      return offlineResult(data);
    }
  }

  const demoUrl = typeof data.demo_url === 'string' ? data.demo_url.trim() : '';
  if (!isHttpsDemoUrl(demoUrl)) return offlineResult(data);

  return {
    state: 'live',
    demoUrl,
    message: readMessage(data),
    updatedAt: readUpdatedAt(data.updated_at),
  };
}

/**
 * Reachability probe. `no-cors` cannot read status codes; a resolved response
 * means the host answered, and a rejection means it was unreachable.
 * CORS failures are not treated as offline, because the demo host is not
 * required to allow this origin.
 */
export async function isDemoReachable(url, fetchImpl = fetch) {
  try {
    await fetchImpl(url, fetchInit({ method: 'HEAD', mode: 'no-cors' }));
    return true;
  } catch {
    try {
      await fetchImpl(url, fetchInit({ method: 'GET', mode: 'no-cors' }));
      return true;
    } catch {
      return false;
    }
  }
}

export async function loadDemoState(statusUrl, options = {}) {
  const fetchImpl = options.fetchImpl || fetch;
  const now = options.now || new Date();
  const checkHealth = options.checkHealth !== false;

  if (!isAcceptableStatusUrl(statusUrl)) {
    return {
      state: 'offline',
      message: DEFAULT_OFFLINE_MESSAGE,
      updatedAt: '',
    };
  }

  let data;
  try {
    const response = await fetchImpl(String(statusUrl).trim(), fetchInit({ method: 'GET' }));
    if (!response || !response.ok) {
      return {
        state: 'offline',
        message: DEFAULT_OFFLINE_MESSAGE,
        updatedAt: '',
      };
    }
    data = await response.json();
  } catch {
    return {
      state: 'offline',
      message: DEFAULT_OFFLINE_MESSAGE,
      updatedAt: '',
    };
  }

  const interpreted = interpretStatus(data, now);
  if (interpreted.state !== 'live' || !checkHealth) return interpreted;

  const reachable = await isDemoReachable(interpreted.demoUrl, fetchImpl);
  if (!reachable) {
    return {
      state: 'offline',
      message: DEFAULT_OFFLINE_MESSAGE,
      updatedAt: interpreted.updatedAt,
    };
  }
  return interpreted;
}
