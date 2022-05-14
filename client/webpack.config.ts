import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import pkg from "./package.json";

const banner = `\
// ==UserScript==
// @name         ${pkg.name}
// @version      ${pkg.version}
// @author       doge2x
// @namespace    https://github.com/doge2x/yuk
// @match        https://examination.xuetangx.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==
`;

function newConfig(
  filename: string,
  minimize?: boolean,
  devMode?: boolean
): webpack.Configuration {
  minimize = minimize ?? false;
  devMode = devMode ?? false;
  return {
    entry: path.resolve(__dirname, "src/index"),
    mode: "none",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
        },
        {
          test: /\.mod\.(c|le)ss$/,
          use: [
            {
              loader: "css-loader",
              options: {
                esModule: true,
                modules: {
                  namedExport: true,
                },
              },
            },
            {
              loader: "less-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
    optimization: {
      minimize: minimize,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              preamble: banner,
            },
          },
        }),
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true,
      }),
      new webpack.DefinePlugin({
        DEV_MODE: devMode,
      }),
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: filename,
    },
  };
}

export default [
  newConfig("yuk.user.js", false),
  newConfig("yuk.min.user.js", true),
  newConfig("yuk.dev.user.js", false, true),
];
