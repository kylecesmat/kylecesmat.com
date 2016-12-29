const path = require('path');
const webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssnext = require('postcss-cssnext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const src = path.join(__dirname, '../../src');
const nodeModules = path.resolve('node_modules');

const staticRoutes = process.env.STATIC_ROUTES;

module.exports = {
  entry: {
    bundle: [
      require.resolve('../polyfills/polyfills'),
      path.join(src, 'index'),
    ],
  },
  output: {
    path: path.resolve('build'),
    filename: 'static/js/[name].js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [src, path.join(nodeModules, '/preact-compat')],
        loader: 'babel-loader',
        query: require('../babel/babel.static'),
      },
      {
        test: /\.css$/,
        include: [src, nodeModules],
        loader: ExtractTextPlugin.extract(
          {
            fallbackLoader: 'style-loader',
            loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
          }
        ),
      },
      {
        test: /\.(jpg|png|gif)(\?.*)?$/,
        include: [src, nodeModules],
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[ext]',
        },
      },
      { test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /.svg$/,
        loaders: [
          'raw-loader',
          'image-webpack-loader',
        ],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'POSTS': process.env.POSTS,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        postcss: () => [postcssImport, postcssnext],
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('static/css/[name].css'),
    new StaticSiteGeneratorPlugin('bundle', JSON.parse(staticRoutes), {
      otherLocals: 'Hello',
    }),
  ],
};
