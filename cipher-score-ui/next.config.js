/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  // Tell Next.js to use Webpack instead of Turbopack
  // (required since you have a webpack config)
  distDir: ".next",
};

module.exports = nextConfig;
