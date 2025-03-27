/* eslint-disable no-restricted-exports */
import {
  fileURLToPath,
  URL
} from "node:url";
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
    "@common": fileURLToPath(new URL("./src/common", import.meta.url)),
    "@background": fileURLToPath(new URL("./src/background", import.meta.url)),
    "@popup": fileURLToPath(new URL("./src/popup", import.meta.url)),
    "@content": fileURLToPath(new URL("./src/content-scripts", import.meta.url)),
  }},
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {main: './index.html',},
      output: {
        entryFileNames: 'assets/main-[hash].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: (id) => {
          if (id.includes('src/popup') || id.includes('src/common')) {
            return 'main';
          }
          if (id.includes('src/content-scripts')) {
            return;
          }

          return 'vendor';
        },
      },
    },
    copyPublicDir: true,
  },
});