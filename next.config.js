const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gg-the-gaming-guide-web-app.azurewebsites.net/api", "localhost"],
  },
};

module.exports = nextConfig;
