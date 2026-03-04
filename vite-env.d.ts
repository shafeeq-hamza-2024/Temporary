/// <reference types="vite/client" />

interface ImportMetaEnv {
  // add any custom environment variables you use here
  readonly VITE_API_BASE_URL: string;
  // readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
