/**
 * Build-time values injected by Vite from ADMIN_PASSWORD_HASH and
 * AGENTFORGE_STATUS_URL. On this static site they ship inside the admin
 * JavaScript chunk. The hash is obfuscation, not server authentication.
 */
export function getAdminConfig() {
  const passwordHash =
    typeof __ADMIN_PASSWORD_HASH__ === 'string' ? __ADMIN_PASSWORD_HASH__.trim() : '';
  const statusUrl =
    typeof __AGENTFORGE_STATUS_URL__ === 'string' ? __AGENTFORGE_STATUS_URL__.trim() : '';
  return { passwordHash, statusUrl };
}
