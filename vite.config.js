import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // یہ تبدیل کریں
  build: {
    outDir: 'dist'
  }
})
