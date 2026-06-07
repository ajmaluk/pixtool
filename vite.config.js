import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
          passes: 3,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        },
        mangle: {
          safari10: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Core React runtime - must load first
              if (
                id.includes('/react/') ||
                id.includes('/react-dom/') ||
                id.includes('/scheduler/') ||
                id.includes('/react-router/') ||
                id.includes('/react-router-dom/')
              ) {
                return 'vendor-react-core';
              }

              // Icons
              if (id.includes('lucide-react')) return 'vendor-icons';

              // Math libraries (large)
              if (id.includes('/mathjs/') || id.includes('/complex.js/') || id.includes('/fraction.js/')) return 'vendor-math';
              if (id.includes('/recharts/') || id.includes('/d3-')) return 'vendor-charts';

              // File processing (very large)
              if (id.includes('/pdf-lib/') || id.includes('/pdfjs-dist/')) return 'vendor-pdf';
              if (id.includes('/tesseract.js/')) return 'vendor-ocr';
              if (id.includes('/html5-qrcode/')) return 'vendor-qr-scan';

              // Backend
              if (id.includes('/@supabase/')) return 'vendor-supabase';

              // Small utilities
              if (id.includes('/qrcode.react/')) return 'vendor-qr';
              if (id.includes('/react-image-crop/')) return 'vendor-image-crop';

              // Remaining node_modules in one chunk to reduce total count
              return 'vendor-others';
            }

            // Split data files into separate chunks
            if (id.includes('/src/data/posts.js')) return 'data-posts';
            if (id.includes('/src/data/tools.js')) return 'data-tools';
            if (id.includes('/src/data/faqs.js')) return 'data-faqs';
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.css$/i.test(assetInfo.name)) {
              return 'assets/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      },
      chunkSizeWarningLimit: 2000
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
      exclude: ['pdfjs-dist', 'tesseract.js']
    },
    server: {
      port: 5173,
      host: true,
      proxy: env.VITE_SUPABASE_URL
        ? {
            '/functions/v1': {
              target: env.VITE_SUPABASE_URL,
              changeOrigin: true,
              secure: true,
            },
          }
        : undefined,
    },
    preview: {
      port: 4173
    }
  }
})
