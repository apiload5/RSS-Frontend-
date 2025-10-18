import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Yeh line GitHub Pages ke liye ZAROORI hai.
  // Aapke repository ka naam "/RSS-Frontend-/" zaroor aana chahiye.
  base: '/RSS-Frontend-/', 
  plugins: [react()],
});
