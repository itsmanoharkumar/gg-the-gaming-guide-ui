const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ggthegamingguide.blob.core.windows.net", "localhost"],
  },
};

module.exports = nextConfig;
