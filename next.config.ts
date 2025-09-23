import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //Para permitir imagens desse host
  images: {
    remotePatterns: [
      {
        protocol: 'https', //http para localhost
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
