/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "https",
        hostname: "harmonious-prize-e83f608dba.strapiapp.com"
      },
      {
        protocol: "https",
        hostname: "*.onrender.com"
      }
    ]
  }
};

export default nextConfig;
