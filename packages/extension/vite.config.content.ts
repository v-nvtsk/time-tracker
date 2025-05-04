/* eslint-disable no-restricted-exports */
import {
  fileURLToPath,
  URL
} from "node:url";
import {defineConfig} from 'vite';

export default defineConfig({
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
      input: {content: './src/content-scripts/index.ts',},
      output: {
        entryFileNames: 'content.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    copyPublicDir: false,
  },
});