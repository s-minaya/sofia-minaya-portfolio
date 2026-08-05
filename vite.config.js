import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Cambia 'usuario' y 'repositorio' por los correctos
  base: '/sofia-minaya-portfolio/',
  server: {
    open: '/',
    watch: {
      usePolling: true
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/gsap/')) {
            return 'gsap';
          }
        }
      }
    }
  }
})
