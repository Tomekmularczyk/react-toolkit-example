const path = require("path");

const appRoot = path.resolve(process.cwd());

const PATHS = {
  appRoot,
  htmlTemplate: path.join(appRoot, "index.html"),
  clientBundleEntry: path.join(appRoot, "src/client.jsx"),
  outputDirectory: path.join(appRoot, "dist/"),
};

module.exports = PATHS;
