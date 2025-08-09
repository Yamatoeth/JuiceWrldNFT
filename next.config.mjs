/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/JuiceWrldNFT',
  assetPrefix: '/JuiceWrldNFT/',
  images: {
    unoptimized: true,
  },
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    
    // Add aliases for problematic packages
    config.resolve.alias = {
      ...config.resolve.alias,
      "unfetch": "unfetch/dist/unfetch.esm.js",
    };
    
    // Ignore specific modules that cause issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "fs": false,
      "net": false,
      "tls": false,
    };
    
    return config;
  },
};

export default nextConfig;
