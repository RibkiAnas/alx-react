const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist'),
  },
  devServer: {
    contentBase: path.resolve('./dist'),
    port: 8564,
    hot: true,
    compress: true,
  },
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'], // babel-loader
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // style-loader, css-loader
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          }
        ], // file-loader
      },
    ],
  },
};
