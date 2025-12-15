import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "khalsaproperty.in"],
  },
  async redirects() {
    return [
      {
        source: "/blogs/how-to-buy-property-in-dubai-as-an-indian-citizen",
        destination: "/",
        permanent: true, // 301 SEO redirect
      },
    ];
  },
};

export default nextConfig;
