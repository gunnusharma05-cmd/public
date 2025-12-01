import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      },
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: [
      'three',
      '@tensorflow/tfjs',
      '@tensorflow-models/coco-ssd',
      '@vladmandic/face-api',
      'tone',
      'socket.io-client',
      'gsap',
      'compromise',
      'jspdf',
      'html2canvas'
    ]
  }
});
