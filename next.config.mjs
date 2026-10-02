/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Photos in the design are exported at a fixed quality; allow the two levels we use.
    qualities: [75, 90],
  },
};

export default nextConfig;
