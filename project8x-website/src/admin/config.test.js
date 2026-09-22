import { describe, expect, it } from 'vitest';
import { getAdminConfig, readBuildString } from './config.js';
import { DEFAULT_DEMO_STATUS_URL } from './defaults.js';

describe('admin config', () => {
  it('uses the published status URL when the build override is blank', () => {
    expect(DEFAULT_DEMO_STATUS_URL).toBe(
      'https://agentforge-foundation-status.s3.us-east-1.amazonaws.com/demo/status.json'
    );
    expect(getAdminConfig()).toEqual({
      passwordHash: '',
      statusUrl: DEFAULT_DEMO_STATUS_URL,
    });
  });

  it('reads a dev-server global when the identifier was not inlined', () => {
    expect(readBuildString('  abc  ', '__ADMIN_PASSWORD_HASH__')).toBe('abc');
    expect(readBuildString('', '__ADMIN_PASSWORD_HASH__')).toBe('');
    globalThis.__AGENTFORGE_DEMO_STATUS_URL__ = ' https://example.com/status.json ';
    try {
      expect(readBuildString(undefined, '__AGENTFORGE_DEMO_STATUS_URL__')).toBe(
        'https://example.com/status.json'
      );
    } finally {
      delete globalThis.__AGENTFORGE_DEMO_STATUS_URL__;
    }
  });
});
