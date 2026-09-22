import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Amplify serves `/admin` from `admin.html` and `/admin/` from `admin/index.html`.
 * Without the directory index, `/admin/` is a 404.
 */
export function copyAdminIndexHtml(outDir) {
  const from = resolve(outDir, 'admin.html');
  if (!existsSync(from)) return false;
  const destDir = resolve(outDir, 'admin');
  mkdirSync(destDir, { recursive: true });
  copyFileSync(from, resolve(destDir, 'index.html'));
  return true;
}
