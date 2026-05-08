import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://laxmiauto-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'https://laxmiauto-backend.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
})
