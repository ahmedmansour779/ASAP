/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "api.real-estate.mentoor.io",
      },
    ],
  },
};

module.exports = nextConfig;
