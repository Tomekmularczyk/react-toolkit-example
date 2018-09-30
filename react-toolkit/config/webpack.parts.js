const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

exports.setDevServer = () => ({
  devServer: {
    compress: true,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    host: "127.0.0.1"
  }
});

exports.generateSourceMaps = type => ({
  devtool: type
});

exports.setEntries = entries => ({
  entry: { ...entries }
});

exports.setDevMode = () => ({
  mode: "development"
});

exports.setProductionMode = () => ({
  mode: "production"
});

exports.transpileJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { "modules": false }],
              "@babel/preset-react"
            ],
            cacheDirectory: true
          }
        }
      }
    ]
  }
});

exports.handleStaticAssets = relativePath => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2|jpg|jpeg|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000,
            name: `${relativePath}[name].[hash].[ext]`
          }
        }
      }
    ]
  }
});

exports.setOutput = (pathToDirectory, isProduction = false) => {
  // remove [chunkhash] with webpack-dev-server - https://github.com/webpack/webpack/issues/2393
  const filename = isProduction
    ? "[name].[chunkhash:8].bundle.js"
    : "[name].bundle.js";
  return {
    output: {
      filename,
      path: pathToDirectory,
      chunkFilename: "[name].[chunkhash:8].bundle.js",
      publicPath: "/"
    }
  };
};

// https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-3
exports.createVendorChunk = moduleList => ({
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: new RegExp(
            `[\\/]node_modules[\\/](${moduleList.join("|")})[\\/]`
          ),
          chunks: "initial",
          name: "vendors",
          enforce: true
        }
      }
    }
  }
});

exports.cleanDirectory = (directory, projectRoot) => ({
  plugins: [
    new CleanWebpackPlugin([directory], { root: projectRoot, verbose: true })
  ]
});

exports.useHTMLTemplate = templatePath => ({
  plugins: [
    new HTMLWebpackPlugin({
      template: templatePath,
      filename: "index.html",
      inject: "body"
    })
  ]
});

exports.setHotModuleReplacement = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

exports.resolveExtensions = extensions => ({
  resolve: {
    extensions
  }
});

