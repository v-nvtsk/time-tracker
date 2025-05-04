import {
  fileURLToPath,
  URL
} from "node:url";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

// https://vite.dev/config/
// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react()],
  define: {"import.meta.env.VITE_BASE_URL": JSON.stringify(
    process.env.CI ? "/time-tracker/" : "/",
  ),},
  base: process.env.CI ? "/time-tracker/" : "/",
  resolve: {alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
    "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
    "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
  }},
  server: {host: true,},
});
