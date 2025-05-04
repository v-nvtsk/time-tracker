/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BACKEND_HOST: string;
  readonly VITE_BACKEND_PORT: string;
  readonly VITE_BASE_URL: string;
}
