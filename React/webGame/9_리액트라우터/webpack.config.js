const path = require('path') 
const webpack = require('webpack')


module.exports = {
  name: 'reactrouter-setting', 
  mode: 'development',
  devtool: 'eval', 
  resolve: { 
      extensions: ['.js', '.jsx']
  },

  entry: { 
    app: ['./client'],             
  },

  module: { 
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', { 
            targets: {
              browsers: ['> 1% in KR', 'last 2 chrome versions'],
            },
          }],
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-hot-loader/babel'
        ],
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }), 
  ],
  output: {
    path: path.join(__dirname, 'dist'), 
    filename: 'app.js', 
    publicPath: '/dist/' 
  }
}