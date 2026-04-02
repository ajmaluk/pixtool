import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep React runtime and router in a stable core chunk.
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/') ||
              id.includes('/react-router/') ||
              id.includes('/react-router-dom/')
            ) {
              return 'vendor-react-core';
            }

            // Animation and icon systems used across many pages.
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('lucide-react')) return 'vendor-icons';

            // Data/visualization and compute-heavy libs.
            if (id.includes('/mathjs/') || id.includes('/complex.js/') || id.includes('/fraction.js/')) return 'vendor-math';
            if (id.includes('/recharts/') || id.includes('/d3-')) return 'vendor-charts';

            // Media/file processing stacks.
            if (id.includes('/pdf-lib/') || id.includes('/pdfjs-dist/')) return 'vendor-pdf';
            if (id.includes('/tesseract.js/')) return 'vendor-ocr';
            if (id.includes('/html5-qrcode/')) return 'vendor-qr-scan';

            // Backend/sdk integrations.
            if (id.includes('/@supabase/')) return 'vendor-supabase';

            // Smaller utility packages.
            if (id.includes('/qrcode.react/')) return 'vendor-qr';
            if (id.includes('/react-image-crop/')) return 'vendor-image-crop';

            return 'vendor-misc';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 2000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'framer-motion', 'qrcode.react'],
    exclude: ['pdfjs-dist']
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173
  }
})
