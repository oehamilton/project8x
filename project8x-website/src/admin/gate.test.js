import { describe, expect, it } from 'vitest';
import {
  normalizePasswordHash,
  sha256Hex,
  timingSafeEqual,
  verifyPassphrase,
} from './gate.js';

describe('admin gate', () => {
  it('hashes the empty string with the SHA-256 test vector', async () => {
    await expect(sha256Hex('')).resolves.toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    );
  });

  it('compares equal hashes and rejects length mismatches', () => {
    expect(timingSafeEqual('abc', 'abc')).toBe(true);
    expect(timingSafeEqual('abc', 'abd')).toBe(false);
    expect(timingSafeEqual('abc', 'abcd')).toBe(false);
  });

  it('accepts only a 64-character hex hash', () => {
    expect(normalizePasswordHash(`  ${'ab'.repeat(32).toUpperCase()}  `)).toHaveLength(64);
    expect(normalizePasswordHash('not-a-hash')).toBe('');
    expect(normalizePasswordHash('')).toBe('');
  });

  it('fails closed when the build hash is missing', async () => {
    await expect(verifyPassphrase('anything', '')).resolves.toEqual({
      ok: false,
      reason: 'unconfigured',
    });
  });

  it('accepts the passphrase that matches the configured hash', async () => {
    const hash = await sha256Hex('local-test-only');
    await expect(verifyPassphrase('local-test-only', hash)).resolves.toEqual({ ok: true });
    await expect(verifyPassphrase('wrong', hash)).resolves.toEqual({
      ok: false,
      reason: 'denied',
    });
  });
});
