import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['mapbox-gl', 'react-map-gl/mapbox'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/mapbox-gl')) return 'mapbox-gl';
          if (id.includes('node_modules/react-map-gl')) return 'react-map-gl';
        },
      },
    },
  },
  server: {
    port: 5173,
    /** Ouvre le navigateur sur l’URL réelle (important si 5173 est déjà pris : Vite passe à 5174, 5175…). */
    open: true,
    host: true, // Permet l'accès depuis le réseau local (téléphone, etc.)
    watch: {
      usePolling: true, // Nécessaire sur Windows pour que les modifs soient détectées sans redémarrer
    },
    proxy: {
      // Rediriger toutes les requêtes API vers Vercel dev (port 3000 par défaut)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
