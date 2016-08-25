var path = require('path');
var config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './main.js'
    //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
    //'webpack-dev-server/client?http://localhost:9090/',
    //'webpack/hot/only-dev-server'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  }
};
module.exports = config;
