const { AngularCompilerPlugin } = require('@ngtools/webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var appModule = __dirname + '/js/ng2/app/app.module#AppModule';


module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.html']
  },
  entry: './js/ng2/app/main.jit.ts',
  //entry: './js/ng2/app/main.aot.ts',
  output: {
    path: path.resolve(__dirname, '.build/aot'),
    filename: 'app.main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'TYPE': JSON.stringify('AOT')
        }
    }),
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig-aot.json',
      entryModule: appModule
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new CopyWebpackPlugin([
        {
            from: './index.html', to: 'index.html'
        },
        {
            from: './node_modules/zone.js/dist/zone.js',
            to: './node_modules/zone.js/dist/zone.js'
        },
        {
            from: './node_modules/bootstrap/dist/css/bootstrap.min.css',
            to: './node_modules/bootstrap/dist/css/bootstrap.min.css'
        },
        {
            from: './node_modules/jquery/dist/jquery.min.js',
            to: './node_modules/jquery/dist/jquery.min.js'
        },
        {
            from: './node_modules/bootstrap/dist/js/bootstrap.min.js',
            to: './node_modules/bootstrap/dist/js/bootstrap.min.js'
        }
    ])
  ],
  module: {
    rules: [
      {test: /\.scss$/, use: ['raw-loader', 'sass-loader']},
      {test: /\.css$/, use: 'raw-loader'},
      {test: /\.html$/, use: 'raw-loader'},
      {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};

