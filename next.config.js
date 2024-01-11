/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "source.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
