var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool  : 'eval',
  entry    : [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './lib/index'
  ],
  output   : {
    filename  : 'app.js',
    path      : path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  resolve  : {
    alias: {
      __DEV_URL__: 'http://localhost:3000/'
    }
  },
  externals: {
    "jQuery": "jQuery"
  },
  plugins  : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env' : {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEV_URL__' : 'http://localhost:3000/',
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true : false
    }),
    new HtmlWebpackPlugin({
      title   : 'Redux React Router Async Example',
      filename: 'index.html',
      template: 'index.template.html',
      favicon : path.join(__dirname, 'assets', 'images', 'favicon.ico')
    }),
    new webpack.ProvidePlugin({
      $              : "jquery",
      jQuery         : "jquery",
      "window.jQuery": "jquery",
    })
  ],
  module   : {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader!cssnext-loader' },
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'lib') },
      {
        test  : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.(gif|jpeg)$/, loader: 'file-loader' },
      {
        test   : /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  cssnext  : {
    browsers: 'last 2 versions'
  }
};
