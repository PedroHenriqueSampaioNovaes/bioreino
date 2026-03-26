import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/fotos-gratis/**',
      },
      {
        protocol: 'https',
        hostname: 'marsemfim.com.br',
        port: '',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'static.mundoeducacao.uol.com.br',
        port: '',
        pathname: '/mundoeducacao/**',
      },
    ],
  },
};

export default nextConfig;
