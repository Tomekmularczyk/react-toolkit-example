const path = require("path");

const scriptsRoot = path.resolve(__dirname, "../../");
const appRoot = path.resolve(process.cwd());

const PATHS = {
  appRoot,
  scriptsRoot,
  htmlTemplate: path.join(appRoot, "index.html"),
  clientBundleEntry: path.join(appRoot, "src/client.jsx"),
  outputDirectory: path.join(appRoot, "dist/"),
};

module.exports = PATHS;
