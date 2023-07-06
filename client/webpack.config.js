const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // webpack plugin that generates html file and injects our bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      // creates a mnifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "JATE",
        short_name: "JATE",
        description: "Just another text editor",
        display: "standalone",
        background_color: "",
        theme_color: "",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 102, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      // Injects our custom service workers
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
    ],

    module: {
      rules: [
        {
          // CSS loaders
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // adding babel loaders
          test: /\.m?js$/,
          exclde: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel.preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
