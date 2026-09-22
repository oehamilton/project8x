import { DEFAULT_DEMO_STATUS_URL } from './defaults.js';

/**
 * Build-time values injected by Vite from ADMIN_PASSWORD_HASH and
 * AGENTFORGE_DEMO_STATUS_URL. On this static site they ship inside the admin
 * JavaScript chunk. The hash is obfuscation, not server authentication.
 *
 * Production builds replace the identifiers below with string literals.
 * The dev server instead assigns them on globalThis, which ES modules cannot
 * read as free variables. An empty string stays empty so the gate stays closed.
 *
 * A blank status URL uses the published status JSON. Fetch failure still
 * renders the offline state.
 */
export function readBuildString(direct, globalKey) {
  if (typeof direct === 'string') return direct.trim();
  const fromGlobal = globalThis[globalKey];
  return typeof fromGlobal === 'string' ? fromGlobal.trim() : '';
}

export function getAdminConfig() {
  const passwordHash = readBuildString(
    typeof __ADMIN_PASSWORD_HASH__ === 'string' ? __ADMIN_PASSWORD_HASH__ : undefined,
    '__ADMIN_PASSWORD_HASH__'
  );
  const injectedStatusUrl = readBuildString(
    typeof __AGENTFORGE_DEMO_STATUS_URL__ === 'string' ? __AGENTFORGE_DEMO_STATUS_URL__ : undefined,
    '__AGENTFORGE_DEMO_STATUS_URL__'
  );
  return {
    passwordHash,
    statusUrl: injectedStatusUrl || DEFAULT_DEMO_STATUS_URL,
  };
}
