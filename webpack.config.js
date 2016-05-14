const webpack = require('webpack');

module.exports = {
  entry: {
    'hooks': './src/hooks.js',
    'hooks.min': './src/hooks.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'RevealHooks'
  },
  externals: {
    'reveal.js': {
      root: 'Reveal',
      commonjs2: 'reveal.js',
      commonjs: 'reveal.js',
      amd: 'reveal.js'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};