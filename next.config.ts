/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // This ignores type errors during the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ignores linting errors during the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;