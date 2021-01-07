const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCssLoader = MiniCssExtractPlugin.loader;

const entry = path.resolve(__dirname, "../dev/index.jsx");
const publicPath = path.resolve(__dirname, "../public");

module.exports = (env) => {
  const { mode } = env;
  return {
    entry,
    output: {
      path: publicPath,
      filename: "bundle.js",
    },
    mode,

    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
          loader: "babel-loader",
        },
        {
          test: /\.s?css$/,
          use: [
            { loader: MiniCssLoader },
            { loader: "css-loader" },
            { loader: "resolve-url-loader" },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(mode),
        },
      }),
    ],
  };
};
