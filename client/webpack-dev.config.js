/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      components: path.resolve('./src/components'),
      views: path.resolve('./src/views')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.s?css$/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]',
          'sass-loader'
        ]
      }
    ]
  }
};
