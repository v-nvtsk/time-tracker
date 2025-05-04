/* eslint-disable new-cap */
/* eslint-disable no-restricted-exports */
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  resolve: {alias: {
    '@': '/src',
    '@common': '/src/common',
    '@background': '/src/background',
    '@popup': '/src/popup',
    '@content': '/src/content-scripts'
  }},
  plugins: [
    react(),
    AutoImport({
      imports: ['vitest'],
      dts: false,
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ["src/__mocks__/chrome.ts"],
    include: ["src/**/*.test.ts"],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        'src/background/index.ts',
        'src/vite-env.d.ts',
        'src/popup/index.ts',
        'src/background/index.ts',
        'src/content-scripts/index.ts',
        'src/main.tsx'
      ],
      thresholds: {
        functions: 80,
        branches: 80,
      }
    }
  },
});