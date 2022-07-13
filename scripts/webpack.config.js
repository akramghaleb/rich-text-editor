const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { multEntry, devOutputName, prodOutputName, bundleSuffix } = require("./utils");
const developmentEnv = process.env.NODE_ENV !== "production";

module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ["babel-loader"],
        include: [path.join(__dirname, "src")],
      },
      {
        test: /\.(ts)$/i,
        use: ["babel-loader", "ts-loader"],
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/,
        use: [developmentEnv ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          developmentEnv ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.less$/,
        use: [
          developmentEnv ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "markdown-loader",
            options: {
              // See https://marked.js.org/using_advanced#options
              highlight: function (code, lang) {
                const hljs = require("highlight.js");
                const language = hljs.getLanguage(lang) ? lang : "plaintext";
                return hljs.highlight(code, { language }).value;
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".json", ".css"],
    alias: {
      "_@": path.resolve(__dirname, "../"),
      "@": path.resolve(__dirname, "../src"),
    },
  },
  plugins: [
    ...multEntry.map(
      (item) =>
        new HtmlWebpackPlugin({
          title: item,
          template: path.join(__dirname, item === "index" ? `../public/index.html` : `../public/${item}/index.html`),
          filename: `${item}.html`,
          chunks: developmentEnv ? [devOutputName, item] : [prodOutputName, `${item}.${bundleSuffix}`],
          favicon: path.join(__dirname, "../public/favicon.ico"),
          inject: "body",
          scriptLoading: developmentEnv ? "defer" : "blocking",
          minify: developmentEnv
            ? false
            : {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
              },
        })
    ),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
