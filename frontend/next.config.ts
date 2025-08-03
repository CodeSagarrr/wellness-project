import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites(){
      return [
        {
          source :"/v1/:path*",
          destination : "http://localhost:8080/v1/:path*"
        }
      ]
    }
};

export default nextConfig;
