import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/RSS-Frontend/',  // آپ کا repository نام
  build: {
    outDir: 'dist'
  }
})
