const webpack = require("webpack");
const webpackConfig = require("./webpack.prod");
const ora = require("ora");
const chalk = require("chalk");
const parseArgs = require("minimist");

const spinner = ora("building...");
spinner.start();

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) {
    throw err;
  }
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + "\n\n"
  );

  if (stats.hasErrors()) {
    console.log(chalk.red("Build failed with errors.\n"));
    process.exit(1);
  }

  const argv = parseArgs(process.argv.slice(2));
  if (!(argv && argv.u === "compile")) {
    console.log("🎉", chalk.cyan("Build successfully.\n"));
  }
});
