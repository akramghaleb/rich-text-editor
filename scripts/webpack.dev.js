const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");
const config = require("./webpack.config");
const { multEntry, devOutputName, bundleSuffix, port, packInfo } = require("./utils");

packInfo();

module.exports = merge(config, {
  mode: "development",
  entry: Object.assign(
    {
      [devOutputName]: path.join(__dirname, "../src/index.js"),
    },
    multEntry.reduce((tot, item) => {
      const obj = { ...tot };
      obj[item] = path.join(__dirname, item === "index" ? `../public/index.js` : `../public/${item}/index.js`);
      return obj;
    }, {})
  ),
  output: {
    filename: `[name].${bundleSuffix}.js`,
    chunkFilename: "[chunkhash].js",
  },
  devServer: {
    port: port,
    hot: true,
    compress: true,
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "env.PRODUCTION": "false",
    }),
  ],
});
