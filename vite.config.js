import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'framer-motion': fileURLToPath(new URL('./src/lib/motionShim.js', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    terserOptions: {
      format: {
        comments: false
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep only the absolute runtime core together.
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/') ||
              id.includes('/react-router/') ||
              id.includes('/react-router-dom/')
            ) {
              return 'vendor-react-core';
            }

            // Non-critical UI libraries can be loaded in separate chunks.
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

            // Let Rollup place remaining deps automatically to avoid forcing cyclic vendor boundaries.
            return;
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
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'qrcode.react'],
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
