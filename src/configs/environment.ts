// import 'dotenv/config'

export const env = {
    API_KEY: import.meta.env.VITE_API_KEY,
    AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
    PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
    STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: import.meta.env.VITE_MESSAGGING_SENDER_ID,
    APP_ID: import.meta.env.VITE_APP_ID,
    MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID
}