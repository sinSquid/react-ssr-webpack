import webpack from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import baseConfig from './client.base';

const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true';

const config = {
  ...baseConfig,
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...baseConfig.plugins,
  ],
  mode: 'development',
  devtool: generateSourceMap ? 'cheap-module-source-map' : false,
  performance: {
    hints: false,
  },
  devServer: {
    hot: true,
  },
};

export default config;
