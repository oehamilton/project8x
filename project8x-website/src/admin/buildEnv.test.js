// @vitest-environment node
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadEnv } from 'vite';
import { describe, expect, it } from 'vitest';
import { readAdminBuildEnv } from './buildEnv.js';

const HASH = 'ab'.repeat(32);

function withEnv(updates, run) {
  const previous = {};
  for (const key of Object.keys(updates)) {
    previous[key] = process.env[key];
    if (updates[key] === undefined) delete process.env[key];
    else process.env[key] = updates[key];
  }
  try {
    return run();
  } finally {
    for (const key of Object.keys(updates)) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
}

describe('admin build env', () => {
  it('keeps an empty hash empty', () => {
    expect(readAdminBuildEnv({}, {})).toEqual({ passwordHash: '', statusUrl: '' });
  });

  it('prefers the shell value and strips wrapping quotes', () => {
    expect(
      readAdminBuildEnv(
        { ADMIN_PASSWORD_HASH: `  "${HASH}"  ` },
        { ADMIN_PASSWORD_HASH: 'from-file' }
      )
    ).toEqual({ passwordHash: HASH, statusUrl: '' });
  });

  it('reads unprefixed names from .env when the shell has none', () => {
    const dir = mkdtempSync(join(tmpdir(), 'p8x-env-'));
    writeFileSync(
      join(dir, '.env'),
      `ADMIN_PASSWORD_HASH=${HASH}\nAGENTFORGE_STATUS_URL=https://example.com/status.json\n`
    );
    try {
      withEnv(
        {
          ADMIN_PASSWORD_HASH: undefined,
          AGENTFORGE_DEMO_STATUS_URL: undefined,
          AGENTFORGE_STATUS_URL: undefined,
        },
        () => {
          const captured = {
            ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
            AGENTFORGE_DEMO_STATUS_URL: process.env.AGENTFORGE_DEMO_STATUS_URL,
            AGENTFORGE_STATUS_URL: process.env.AGENTFORGE_STATUS_URL,
          };
          const fileEnv = loadEnv('production', dir, '');
          expect(readAdminBuildEnv(captured, fileEnv)).toEqual({
            passwordHash: HASH,
            statusUrl: 'https://example.com/status.json',
          });
        }
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
