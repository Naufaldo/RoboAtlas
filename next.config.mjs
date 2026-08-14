/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim();
// Use explicitly provided NEXT_PUBLIC_BASE_PATH or default to /RoboAtlas in production
const basePath = rawBasePath !== '' ? rawBasePath : (isProd ? '/RoboAtlas' : '');

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath !== '' ? basePath : undefined,
  reactStrictMode: true,
};

export default nextConfig;
