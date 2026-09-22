/**
 * Build-time admin settings. Amplify (and local shells) export
 * ADMIN_PASSWORD_HASH / AGENTFORGE_DEMO_STATUS_URL without a VITE_ prefix.
 * Vite does not put those names on import.meta.env. Read them here and inline
 * the two strings with vite `define`.
 *
 * AGENTFORGE_STATUS_URL is accepted when the demo-specific name is unset.
 */

export function cleanBuildValue(value) {
  let text = String(value ?? '').replace(/^\uFEFF/, '').trim();
  if (text.length >= 2) {
    const quote = text[0];
    if ((quote === '"' || quote === "'") && text[text.length - 1] === quote) {
      text = text.slice(1, -1).trim();
    }
  }
  return text;
}

export function readAdminBuildEnv(processEnv = {}, fileEnv = {}) {
  const passwordHash = cleanBuildValue(
    processEnv.ADMIN_PASSWORD_HASH ?? fileEnv.ADMIN_PASSWORD_HASH ?? ''
  );
  const statusUrl = cleanBuildValue(
    processEnv.AGENTFORGE_DEMO_STATUS_URL ??
      fileEnv.AGENTFORGE_DEMO_STATUS_URL ??
      processEnv.AGENTFORGE_STATUS_URL ??
      fileEnv.AGENTFORGE_STATUS_URL ??
      ''
  );
  return { passwordHash, statusUrl };
}
