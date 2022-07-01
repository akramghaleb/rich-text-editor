const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const WebpackBar = require("webpackbar");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { multEntry, prodOutputName, bundleSuffix } = require("./setting");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "production",
  entry: Object.assign(
    {
      [prodOutputName]: path.resolve(__dirname, "../src/index.js"),
    },
    multEntry.reduce((tot, item) => {
      const obj = { ...tot };
      obj[`${item}.${bundleSuffix}`] = path.join(
        __dirname,
        item === "index" ? `../public/index.js` : `../public/${item}/index.js`
      );
      return obj;
    }, {})
  ),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "./",
  },
  performance: {
    hints: "warning",
    maxAssetSize: 3000000,
    maxEntrypointSize: 5000000,
  },
  // devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "env.PRODUCTION": "true",
    }),
    new webpack.ids.HashedModuleIdsPlugin(),
    new WebpackBar({
      color: "#00d584",
      basic: false,
      profile: false,
    }),
    new CleanWebpackPlugin(),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.join(__dirname, `../dist/${prodOutputName}.js`),
              destination: path.join(__dirname, `../dist/doc/${prodOutputName}.js`),
            },
            {
              source: path.join(__dirname, `../dist/${prodOutputName}.css`),
              destination: path.join(__dirname, `../dist/doc/${prodOutputName}.css`),
            },
            {
              source: path.join(__dirname, `../public/common.js`),
              destination: path.join(__dirname, `../dist/doc/common.js`),
            },
          ],
          move: [
            ...multEntry.map((item) => ({
              source: path.join(__dirname, `../dist/${item}.html`),
              destination: path.join(__dirname, `../dist/doc/${item}.html`),
            })),
            ...multEntry.map((item) => ({
              source: path.join(__dirname, `../dist/${item}.${bundleSuffix}.js`),
              destination: path.join(__dirname, `../dist/doc/${item}.${bundleSuffix}.js`),
            })),
            ...multEntry.map((item) => ({
              source: path.join(__dirname, `../dist/${item}.${bundleSuffix}.css`),
              destination: path.join(__dirname, `../dist/doc/${item}.${bundleSuffix}.css`),
            })),
            {
              source: path.join(__dirname, `../dist/favicon.ico`),
              destination: path.join(__dirname, `../dist/doc/favicon.ico`),
            },
          ],
        },
      },
    }),
  ],
});
