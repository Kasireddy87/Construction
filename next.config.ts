import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder imagery used by src/lib/sample-data.ts until the CMS has real photos.
      { protocol: "https", hostname: "picsum.photos" },
      // Sanity's asset CDN, once NEXT_PUBLIC_SANITY_PROJECT_ID is configured.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
