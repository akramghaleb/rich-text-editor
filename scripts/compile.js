const fs = require("fs");
const path = require("path");
const cpr = require("cpr");
const chalk = require("chalk");

const folderPath = path.resolve("src/");

let finish = false;

/**
 * Copy files
 * @param filePath
 */
const copyFiles = (filePath) => {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err, "Error reading folder");
    } else {
      files.forEach(function (filename) {
        finish = false;
        const filedir = path.join(filePath, filename);
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn("Failed to get file stats");
          } else {
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();
            if (isFile) {
              const cssSuffix = ".css";
              const tsSuffix = ".d.ts";
              const fileSuffix_css = filedir.substring(filedir.length - cssSuffix.length);
              const fileSuffix_ts = filedir.substring(filedir.length - tsSuffix.length);
              if (fileSuffix_css === cssSuffix || fileSuffix_ts === tsSuffix) {
                const fromPath = filedir;
                const toPath = filedir.replace(/src/, "lib");
                cpr(fromPath, toPath, {});
              }
            }
            if (isDir) {
              copyFiles(filedir);
            }
          }
        });
      });
      finish = true;
    }
  });
};

copyFiles(folderPath);

let timer = null;

timer = setInterval(function () {
  if (finish) {
    timer && clearTimeout(timer);
    console.log("\n🎁", chalk.cyan("ExploreEditor compiled successfully.\n"));
  }
}, 100);
