import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import pkg from "./package.json";

const banner = `\
// ==UserScript==
// @name         ${pkg.name}
// @version      ${pkg.version}
// @match        https://examination.xuetangx.com/exam/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest
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
    entry: path.resolve(__dirname, "src/index.ts"),
    mode: "none",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "@teamsupercell/typings-for-css-modules-loader",
              options: {
                formatter: "prettier",
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "__yuk_[hash:base64]",
                },
              },
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
