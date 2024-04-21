import { createContentlayerPlugin, withContentlayer } from 'next-contentlayer';
// const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// const withContentlayer = createContentlayerPlugin({});

export default withContentlayer(nextConfig);
// module.exports = withContentlayer(nextConfig);
