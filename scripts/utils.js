const boxen = require("boxen");
const figlet = require("figlet");
const chalk = require("chalk");
const packageJson = require("../package.json");

const multEntry = ["index", "getting-started", "examples", "options", "document", "custom-plugins"];
const prodOutputName = "explore-editor.min";
const devOutputName = "editor";
const bundleSuffix = "bundle";
const port = 8000;

/**
 * Boxen options as defined by https://www.npmjs.com/package/boxen
 * @type {{padding: {top: number, left: number, bottom: number, right: number}}}
 */
const boxenOptions = {
  padding: {
    left: 13,
    right: 13,
    top: 1,
    bottom: 1,
  },
};

/**
 * Figlet options as defined by https://github.com/patorjk/figlet.js
 * @type {{horizontalLayout: string, font: string}}
 */
const figletOptions = {
  font: "Small Slant",
  horizontalLayout: "Standard",
};

/**
 * Package info
 */
const { name, version, author, license } = packageJson;
const details = chalk.cyan(`${author} | Version ${version} | License ${license} `);
function packInfo() {
  console.log(chalk.cyan(figlet.textSync(name, figletOptions)));
  console.log(boxen(details, boxenOptions), "\n");
}

/**
 * Export
 */
module.exports = { multEntry, devOutputName, prodOutputName, bundleSuffix, port, packInfo };
