import baseConfig from './client.base';

const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true';

const config = {
  ...baseConfig,
  mode: 'production',
  devtool: generateSourceMap ? 'source-map' : false,
};

config.output.filename = '[name].[contenthash].bundle.js';

export default config;
