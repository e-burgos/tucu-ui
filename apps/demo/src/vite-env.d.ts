/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_ANALYTICS_TAG_ID?: string;
  readonly VITE_APP_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
