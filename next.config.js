/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, noimageindex' }
        ]
      }
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'car-lounge.ru',
        pathname: '/classes/**'
      },
      {
        protocol: 'https',
        hostname: 'car-lounge.ru',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**'
      }
    ]
  }
};

module.exports = nextConfig;
