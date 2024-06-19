/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY;
  VITE_AUTH_DOMAIN;
  VITE_PROJECT_ID;
  VITE_STORAGE_BUCKET;
  VITE_MESSAGGING_SENDER_ID;
  VITE_APP_ID;
  VITE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
