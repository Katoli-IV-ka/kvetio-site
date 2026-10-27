/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/v2', destination: '/', permanent: true }];
  },
  // preview and staging deployments on *.vercel.app are kept out of search; kvet.io is unaffected
  async headers() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?<host>.+)\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
