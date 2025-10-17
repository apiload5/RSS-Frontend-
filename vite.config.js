import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 👇️ Yeh line ZAROOR add karein
  base: '/RSS-Frontend-/', 
  plugins: [react()],
})
