const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    BASE_HOST: process.env.BASE_HOST,
    API_USERS: process.env.API_USERS,
    API_USER_STORE: process.env.API_USER_STORE,
    API_USER_UPDATE: process.env.API_USER_UPDATE,
    API_CONTACTS: process.env.API_CONTACTS,
  }
}

module.exports = withNextIntl(nextConfig)
