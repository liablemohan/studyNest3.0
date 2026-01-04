/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // Enable automatic image optimization
        deviceSizes: [640, 768, 1024, 1280, 1600],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    // Enable turbopack compatibility
    turbopack: {},
    // webpack config for server-side optimization
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias['three'] = false;
        }
        return config;
    },
};
module.exports = nextConfig;
