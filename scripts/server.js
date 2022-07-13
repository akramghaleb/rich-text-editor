const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.dev.js");

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("🚀 Starting server...");
  await server.start();
};

runServer();
