/** @type {import('next').NextConfig} */


module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // For the server, you might want to include 'babel-regenerator-runtime'
    if (isServer) {
      config.externals.push('regenerator-runtime');
    }

    return config;
  }
  // other Next.js configurations...
};
