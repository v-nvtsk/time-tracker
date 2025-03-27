/// <reference types="vitest" />
/* eslint-disable no-restricted-exports */
import {
  fileURLToPath,
  URL
} from "node:url";
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [],
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
      input: {background: './src/background/index.ts',},
      output: {
        entryFileNames: 'background.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: (id) => {
          if (id.includes('src/background') || id.includes('src/common')) {
            return 'background';
          }
        },
      },
    },
    copyPublicDir: false,
  },
});