const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ggthegamingguide.azurewebsites.net", "localhost"],
  },
};

module.exports = nextConfig;
