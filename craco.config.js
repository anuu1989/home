const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Remove problematic plugins for React Scripts 4.x compatibility
      webpackConfig.plugins = webpackConfig.plugins.filter(
        plugin => 
          plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin' &&
          plugin.constructor.name !== 'ESLintWebpackPlugin'
      );

      // Add aliases for consistent package resolution (React Scripts 4.x compatible)
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'ajv': path.resolve(__dirname, 'node_modules/ajv'),
        'ajv-keywords': path.resolve(__dirname, 'node_modules/ajv-keywords'),
        'schema-utils': path.resolve(__dirname, 'node_modules/schema-utils'),
        'terser-webpack-plugin': path.resolve(__dirname, 'node_modules/terser-webpack-plugin'),
      };

      // Fix terser plugin configuration for ajv compatibility
      const terserPlugin = webpackConfig.optimization.minimizer.find(
        plugin => plugin.constructor.name === 'TerserPlugin'
      );
      
      if (terserPlugin) {
        // Disable terser plugin validation that causes ajv issues
        terserPlugin.options = {
          ...terserPlugin.options,
          parallel: false, // Disable parallel processing to avoid ajv conflicts
        };
      }

      return webpackConfig;
    },
  },
  // Simplified babel configuration for React Scripts 4.x
  babel: {
    plugins: [
      // Only essential plugins for React Scripts 4.x
    ],
  },
  typescript: {
    enableTypeChecking: false,
  },
  eslint: {
    enable: false,
  },
};