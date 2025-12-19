import { withContentlayer } from 'next-contentlayer';
// const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/intro',
        permanent: true,
      },
    ];
  },
};

// const withContentlayer = createContentlayerPlugin({});

export default withContentlayer(nextConfig);
// module.exports = withContentlayer(nextConfig);
