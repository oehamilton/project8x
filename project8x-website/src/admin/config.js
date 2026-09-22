import { DEFAULT_DEMO_STATUS_URL } from './defaults.js';

/**
 * Build-time values injected by Vite from ADMIN_PASSWORD_HASH and
 * AGENTFORGE_DEMO_STATUS_URL. On this static site they ship inside the admin
 * JavaScript chunk. The hash is obfuscation, not server authentication.
 *
 * A blank status URL uses the published status JSON. Fetch failure still
 * renders the offline state.
 */
export function getAdminConfig() {
  const passwordHash =
    typeof __ADMIN_PASSWORD_HASH__ === 'string' ? __ADMIN_PASSWORD_HASH__.trim() : '';
  const injectedStatusUrl =
    typeof __AGENTFORGE_DEMO_STATUS_URL__ === 'string'
      ? __AGENTFORGE_DEMO_STATUS_URL__.trim()
      : '';
  return {
    passwordHash,
    statusUrl: injectedStatusUrl || DEFAULT_DEMO_STATUS_URL,
  };
}
