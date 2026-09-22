import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { readAdminBuildEnv } from './src/admin/buildEnv.js'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// Amplify injects ADMIN_PASSWORD_HASH and AGENTFORGE_DEMO_STATUS_URL (or
// AGENTFORGE_STATUS_URL) with no VITE_ prefix. import.meta.env would drop them.
// Capture process.env before loadEnv, then inline only these two strings.
// A blank status URL falls back to the published status JSON inside getAdminConfig.
function adminBuildEnv(mode) {
  const captured = {
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    AGENTFORGE_DEMO_STATUS_URL: process.env.AGENTFORGE_DEMO_STATUS_URL,
    AGENTFORGE_STATUS_URL: process.env.AGENTFORGE_STATUS_URL,
  }
  // '' loads unprefixed names from .env. Do not set envPrefix: '' — Vite refuses
  // that because it would expose every variable on import.meta.env.
  const fileEnv = loadEnv(mode, rootDir, '')
  return readAdminBuildEnv(captured, fileEnv)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const admin = adminBuildEnv(mode)
  return {
    plugins: [react()],
    define: {
      __ADMIN_PASSWORD_HASH__: JSON.stringify(admin.passwordHash),
      __AGENTFORGE_DEMO_STATUS_URL__: JSON.stringify(admin.statusUrl),
    },
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(rootDir, 'index.html'),
          admin: resolve(rootDir, 'admin.html'),
        },
      },
    },
  }
})
