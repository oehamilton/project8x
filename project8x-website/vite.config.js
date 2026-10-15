import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { spaFallbackRoutes } from './spaFallback.js'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

function spaTrailingSlashFallback() {
  return {
    name: 'spa-trailing-slash-fallback',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(rootDir, 'build')
      const indexPath = resolve(outDir, 'index.html')
      if (!existsSync(indexPath)) return
      const indexHtml = readFileSync(indexPath)
      for (const route of spaFallbackRoutes) {
        const dir = resolve(outDir, route)
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), indexHtml)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spaTrailingSlashFallback()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
})
