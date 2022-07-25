import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';

const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const isProd = process.env.NODE_ENV === 'production';

const cssModuleOptions = isProd
  ? { localIdentName: '[hash:base64:8]' }
  : { getLocalIdent: getCSSModuleLocalIdent };

const babelLoader = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
  options: {
    plugins: [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
            },
          },
        },
      ],
    ],
    cacheDirectory: true,
    cacheCompression: process.env.NODE_ENV === 'production',
    compact: process.env.NODE_ENV === 'production',
  },
};

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: { ...cssModuleOptions, exportLocalsConvention: 'camelCase' },
        importLoaders: 1,
        sourceMap: generateSourceMap,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: generateSourceMap,
      },
    },
  ],
  sideEffects: true,
};

const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    MiniCssExtractPlugin.loader,
    require.resolve('css-loader'),
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: generateSourceMap,
      },
    },
  ],
  sideEffects: true,
};

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: {
          ...cssModuleOptions,
          exportLocalsConvention: 'camelCase',
          exportOnlyLocals: true,
        },
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: generateSourceMap,
      },
    },
  ],
  sideEffects: true,
};

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
  sideEffects: true,
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 2048,
    name: 'assets/[name].[contenthash].[ext]',
  },
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
};

const fileLoaderClient = {
  exclude: [/\.(js|jsx|ts|tsx|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[contenthash].[ext]',
      },
    },
  ],
};

const fileLoaderServer = {
  exclude: [/\.(js|tsx|ts|tsx|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[contenthash].[ext]',
        emitFile: false,
      },
    },
  ],
};

export const client = [
  {
    oneOf: [babelLoader, cssModuleLoaderClient, cssLoaderClient, urlLoaderClient, fileLoaderClient],
  },
];

export const server = [
  {
    oneOf: [babelLoader, cssModuleLoaderServer, cssLoaderServer, urlLoaderServer, fileLoaderServer],
  },
];
