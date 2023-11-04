// Importar el tipo NextConfig
/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Ignorar los errores de ESLint en el desarrollo
    ignoreDuringBuilds: true
  },
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    BUCKET_URL: process.env.BUCKET_URL,
    QR_ROUTE: process.env.QR_ROUTE,
    BUILD_ID: '12131234343423454545'
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
