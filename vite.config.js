import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/RSS-Frontend-/',
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  // rollupOptions HATA DO - yehi problem hai
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
})
