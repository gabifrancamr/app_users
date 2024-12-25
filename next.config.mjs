/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'techsoluctionscold.com.br',
          port: '',
          pathname: '/api-boats/uploads/tests/**',
        },
      ],
    },
};

export default nextConfig;
