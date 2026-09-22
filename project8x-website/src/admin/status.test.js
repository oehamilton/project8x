import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_OFFLINE_MESSAGE,
  interpretStatus,
  isAcceptableStatusUrl,
  isHttpsDemoUrl,
  loadDemoState,
} from './status.js';

const liveDocument = {
  live: true,
  demo_url: 'https://example.com/ui/demo.html',
  ttl_ends_at: '2099-12-31T23:59:59.000Z',
  updated_at: '2026-09-22T15:00:00.000Z',
  message: 'Local fixture: demo is live.',
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

  it('shows live only when the flag and https demo URL are both set', () => {
    expect(interpretStatus(liveDocument).state).toBe('live');
    expect(interpretStatus(liveDocument).demoUrl).toBe('https://example.com/ui/demo.html');
    expect(interpretStatus({ ...liveDocument, live: false }).message).toBe(
      'Local fixture: demo is live.'
    );
    expect(interpretStatus({ ...liveDocument, demo_url: '' }).state).toBe('offline');
    expect(interpretStatus({ live: true, demo_url: 'http://example.com/demo' }).state).toBe('offline');
  });

  it('treats an elapsed ttl as offline and keeps the publisher message', () => {
    const result = interpretStatus(
      {
        ...liveDocument,
        ttl_ends_at: '2020-01-01T00:00:00.000Z',
        message: 'Local fixture: demo window has ended.',
      },
      new Date('2026-09-22T00:00:00.000Z')
    );
    expect(result).toMatchObject({
      state: 'offline',
      message: 'Local fixture: demo window has ended.',
    });
  });

  it('uses the default offline copy when the document has no message', () => {
    expect(interpretStatus({ live: false }).message).toBe(DEFAULT_OFFLINE_MESSAGE);
    expect(interpretStatus(null).message).toBe(DEFAULT_OFFLINE_MESSAGE);
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
  });

  it('returns the demo link when status is live and the host answers', async () => {
    const fetchImpl = vi.fn(async (url) => {
      if (String(url).includes('status.json')) return jsonResponse(liveDocument);
      return { ok: true };
    });
    const result = await loadDemoState('https://status.example/status.json', { fetchImpl });
    expect(result).toMatchObject({
      state: 'live',
      demoUrl: 'https://example.com/ui/demo.html',
      message: 'Local fixture: demo is live.',
    });
  });

  it('degrades to offline when the demo host is unreachable', async () => {
    const fetchImpl = vi.fn(async (url) => {
      if (String(url).includes('status.json')) return jsonResponse(liveDocument);
      throw new Error('unreachable');
    });
    const result = await loadDemoState('https://status.example/status.json', { fetchImpl });
    expect(result).toMatchObject({
      state: 'offline',
      message: DEFAULT_OFFLINE_MESSAGE,
    });
  });

  it('prefers the offline fixture message', async () => {
    const fetchImpl = vi.fn(async () =>
      jsonResponse({
        live: false,
        demo_url: '',
        message: 'Local fixture: demo is offline.',
      })
    );
    const result = await loadDemoState('/fixtures/agentforge-status.offline.json', {
      fetchImpl,
    });
    expect(result).toMatchObject({
      state: 'offline',
      message: 'Local fixture: demo is offline.',
    });
  });
});
