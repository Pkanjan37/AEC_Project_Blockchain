const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
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
  performance: {
    hints: 'warning'
  },
  plugins: [
    new webpack.DefinePlugin(
      {
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }
    ),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    })
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
