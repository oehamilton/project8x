import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// Amplify injects ADMIN_PASSWORD_HASH and AGENTFORGE_DEMO_STATUS_URL into the
// build environment. Local `.env` files are read the same way. Values are inlined
// into the admin chunk only — this static host has no server-side secret store.
// A blank status URL falls back to the published status JSON inside getAdminConfig.
function adminBuildEnv(mode) {
  const fileEnv = loadEnv(mode, rootDir, '')
  const passwordHash = (process.env.ADMIN_PASSWORD_HASH ?? fileEnv.ADMIN_PASSWORD_HASH ?? '').trim()
  const statusUrl = (process.env.AGENTFORGE_DEMO_STATUS_URL ?? fileEnv.AGENTFORGE_DEMO_STATUS_URL ?? '').trim()
  return { passwordHash, statusUrl }
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
