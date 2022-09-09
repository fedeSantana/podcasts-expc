import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]_podcasts.js`,
        chunkFileNames: `assets/[name]_podcasts.js`,
        assetFileNames: `assets/[name]_podcasts.[ext]`
      }
    }
  }
})