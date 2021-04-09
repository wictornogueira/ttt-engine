const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  devtool: 'source-map',
  // target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {}
        },
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'TTT',
    libraryTarget: 'umd',
    globalObject: 'this',
  }
};
