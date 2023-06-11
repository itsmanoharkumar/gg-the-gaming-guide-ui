const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["commanstorageaccount.blob.core.windows.net", "localhost"],
  },
  // async redirects() {
  //   return [
  //     {
  // source: "/product",
  // destination: "/",
  // permanent: true,
  // },
  // ];
  // },
};

module.exports = nextConfig;
