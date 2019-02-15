const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = {
  entry: path.resolve(__dirname, 'assets/js/src/index.js'),
  output: {
    path: path.resolve(__dirname, 'assets/js/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'assets/js/src'),
      components: path.resolve(__dirname, 'assets/js/src/components'),
      views: path.resolve(__dirname, 'assets/js/src/views'),
      theme: path.resolve(__dirname, 'assets/js/src/theme'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'modules.css'})
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'assets/js/src'),
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        include: path.resolve(__dirname, 'assets/js/src'),
      }
    ]
  }
}

module.exports = common
