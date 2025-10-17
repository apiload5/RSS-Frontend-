import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/RSS-Frontend-/',
  build: {
    outDir: 'dist',
    sourcemap: false
    // Koi rollupOptions nahi
  },
  server: {
    port: 3000
  }
})
