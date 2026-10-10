/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The root now serves the new site; the previous landing page lives at /v1.
      { source: '/', destination: '/v2', permanent: false },
    ];
  },
};

export default nextConfig;
