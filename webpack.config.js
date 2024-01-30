const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = path.join(__dirname, "./", "src");

module.exports = {
  mode: 'development', // 'production' for production builds
  devtool: 'inline-source-map', //devtool: false, // 'inline-source-map' for debugging
  entry: {
    popup: path.join(srcDir, "popup.tsx"), 
    background: path.join(srcDir, "background.ts"),
    options: path.join(srcDir, "options.tsx"),
    content: path.join(srcDir, "content.tsx"),
    // add more entries if you have more scripts
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'), // output directory
    filename: '[name].js', // name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
        patterns: [{ from: ".", to: "../", context: "public" }],
        options: {},
    }),
  ],
};
