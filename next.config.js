/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'sprofile.line-scdn.net',
          port: '',
          pathname: '/**',
        },
      ],
    },
};

module.exports = nextConfig

