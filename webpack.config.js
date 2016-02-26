var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: __dirname + '/app/index.js',
    vendor: [
      'axios',
      'babel-polyfill',
      'lodash',
      'react',
      'react-document-title',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-promise',
      'redux-thunk'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public',
    publicPath: '/public/',
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.jsx?$/
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({filename: 'vendor.js', name: 'vendor'}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
    new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", jquery: "jquery", "window.jQuery": "jquery"})
  ],
  resolve: {
    extensions: ['', '.jsx', '.js', '.json']
  },
  devtool: 'eval'
};
