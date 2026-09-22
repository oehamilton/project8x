import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    __ADMIN_PASSWORD_HASH__: JSON.stringify(''),
    __AGENTFORGE_DEMO_STATUS_URL__: JSON.stringify(''),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
})
