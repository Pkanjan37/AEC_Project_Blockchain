/* eslint-disable no-console, import/no-extraneous-dependencies */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack-dev.config');

new WebpackDevServer(webpack(config), {
  contentBase: './public',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
})
.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000/');
});
