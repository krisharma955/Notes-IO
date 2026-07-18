import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Dev-only proxy: routes /api requests through the dev server to avoid CORS
    // issues during local development. This is NOT a production fix — the Spring Boot
    // WebSecurityConfig must explicitly allow the deployed frontend origin in its
    // CORS config for production to work correctly.
    proxy: {
      '/api': {
        target: 'https://notes-api-1-gng7.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
