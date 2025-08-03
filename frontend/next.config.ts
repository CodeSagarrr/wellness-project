import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites(){
      return [
        {
          source :"/v1/:path*",
          destination : "https://wellness-project.onrender.com/v1/:path*"
        }
      ]
    }
};

export default nextConfig;
