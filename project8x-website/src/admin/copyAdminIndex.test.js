// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { copyAdminIndexHtml } from './copyAdminIndex.js';

describe('admin trailing-slash page', () => {
  it('copies admin.html to admin/index.html', () => {
    const dir = mkdtempSync(join(tmpdir(), 'p8x-admin-html-'));
    writeFileSync(join(dir, 'admin.html'), '<html>gate</html>');
    try {
      expect(copyAdminIndexHtml(dir)).toBe(true);
      expect(readFileSync(join(dir, 'admin', 'index.html'), 'utf8')).toBe('<html>gate</html>');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('does nothing when admin.html is absent', () => {
    const dir = mkdtempSync(join(tmpdir(), 'p8x-admin-html-'));
    try {
      expect(copyAdminIndexHtml(dir)).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
