import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_INTERNAL_MESSAGE,
  DEFAULT_OFFLINE_MESSAGE,
  interpretStatus,
  isAcceptableStatusUrl,
  isHttpsDemoUrl,
  loadDemoState,
} from './status.js';

const liveDocument = {
  schema_version: 1,
  live: true,
  demo_url: 'https://example.com/ui/demo.html',
  ttl_ends_at: '2099-12-31T23:59:59Z',
  updated_at: '2026-09-22T15:00:00Z',
  message: 'Local fixture: demo is live.',
};

const offlineDocument = {
  schema_version: 1,
  live: false,
  demo_url: null,
  ttl_ends_at: '2026-09-25T01:07:11Z',
  updated_at: '2026-09-22T15:00:00Z',
  message: 'Demo offline — next window TBD',
};

function jsonResponse(body, ok = true) {
  return { ok, json: async () => body };
}

describe('agentforge status', () => {
  it('allows https status URLs, local http, and same-origin paths', () => {
    expect(isAcceptableStatusUrl('https://status.example/status.json')).toBe(true);
    expect(isAcceptableStatusUrl('http://localhost:3000/fixtures/agentforge-status.live.json')).toBe(true);
    expect(isAcceptableStatusUrl('/fixtures/agentforge-status.live.json')).toBe(true);
    expect(isAcceptableStatusUrl('http://example.com/status.json')).toBe(false);
    expect(isAcceptableStatusUrl('//example.com/status.json')).toBe(false);
    expect(isAcceptableStatusUrl('')).toBe(false);
  });

  it('requires an https demo URL', () => {
    expect(isHttpsDemoUrl('https://example.com/ui/demo.html')).toBe(true);
    expect(isHttpsDemoUrl('http://example.com/ui/demo.html')).toBe(false);
    expect(isHttpsDemoUrl('javascript:alert(1)')).toBe(false);
    expect(isHttpsDemoUrl('')).toBe(false);
  });

  it('shows Open demo only when live and demo_url is https', () => {
    const live = interpretStatus(liveDocument);
    expect(live.state).toBe('live');
    expect(live.demoUrl).toBe('https://example.com/ui/demo.html');
    expect(interpretStatus({ ...liveDocument, schema_version: undefined }).state).toBe('live');
  });

  it('treats live with a null demo_url as internal and hides the public link', () => {
    const result = interpretStatus({
      schema_version: 1,
      live: true,
      demo_url: null,
      ttl_ends_at: null,
      updated_at: '2026-09-22T15:00:00Z',
      message: 'Local fixture: demo is live on the internal network only.',
    });
    expect(result).toMatchObject({
      state: 'internal',
      message: 'Local fixture: demo is live on the internal network only.',
    });
    expect(result.demoUrl).toBeUndefined();
  });

  it('uses the internal default when live has no message and no public URL', () => {
    expect(interpretStatus({ live: true, demo_url: null }).message).toBe(DEFAULT_INTERNAL_MESSAGE);
    expect(interpretStatus({ live: true, demo_url: '' }).state).toBe('internal');
    expect(interpretStatus({ live: true, demo_url: 'http://example.com/demo' }).state).toBe('internal');
  });

  it('keeps a public link when ttl_ends_at is null or already past', () => {
    expect(interpretStatus({ ...liveDocument, ttl_ends_at: null }).state).toBe('live');
    expect(
      interpretStatus({
        ...liveDocument,
        ttl_ends_at: '2020-01-01T00:00:00Z',
      }).state
    ).toBe('live');
  });

  it('shows the publisher message when the demo is offline', () => {
    expect(interpretStatus(offlineDocument)).toMatchObject({
      state: 'offline',
      message: 'Demo offline — next window TBD',
      updatedAt: '2026-09-22T15:00:00Z',
      ttlEndsAt: '2026-09-25T01:07:11Z',
    });
    expect(interpretStatus({ live: false, demo_url: null }).message).toBe(DEFAULT_OFFLINE_MESSAGE);
    expect(interpretStatus(null).message).toBe(DEFAULT_OFFLINE_MESSAGE);
    expect(interpretStatus({ schema_version: 2, live: true, demo_url: 'https://example.com/a' }).state).toBe(
      'offline'
    );
  });

  it('stays offline when the status URL is missing or the fetch fails', async () => {
    await expect(loadDemoState('')).resolves.toMatchObject({
      state: 'offline',
      message: DEFAULT_OFFLINE_MESSAGE,
    });
    const fetchImpl = vi.fn(async () => {
      throw new Error('network');
    });
    await expect(
      loadDemoState('https://status.example/status.json', { fetchImpl })
    ).resolves.toMatchObject({ state: 'offline' });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('returns the demo link from a direct status GET', async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(liveDocument));
    const result = await loadDemoState('https://status.example/status.json', { fetchImpl });
    expect(result).toMatchObject({
      state: 'live',
      demoUrl: 'https://example.com/ui/demo.html',
      message: 'Local fixture: demo is live.',
    });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('reads the offline fixture message from a direct status GET', async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(offlineDocument));
    const result = await loadDemoState('/fixtures/agentforge-status.offline.json', { fetchImpl });
    expect(result).toMatchObject({
      state: 'offline',
      message: 'Demo offline — next window TBD',
    });
  });
});
