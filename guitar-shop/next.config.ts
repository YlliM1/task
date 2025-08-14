import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all domains
      },
    ],
    // Or alternatively list all domains you need:
    domains: [
      'upload.wikimedia.org',
      '1000logos.net',
      'graphql-api-brown.vercel.app',
      // Add all other domains your images use
    ],
  },
};

export default nextConfig;
