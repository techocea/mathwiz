import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // This is the industrial fix for the 'canvas' module not found error
    config.resolve.alias.canvas = false;

    // Optional: also ignore 'encoding' if it pops up later
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
      net: false,
      tls: false,
    };

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/didspg6kj/**",
      },
    ],
  },
};

export default nextConfig;
