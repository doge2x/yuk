import { defineConfig } from "vite";
import pkg from "./package.json";
import path from "path";
import solidPlugin from "vite-plugin-solid";

const NAME = pkg.name;
const VERSION = pkg.version;
const BANNER = `\
// ==UserScript==
// @name         ${NAME}
// @version      ${VERSION}
// @author       doge2x
// @icon         https://www.yuketang.cn/static/images/favicon.ico
// @match        https://examination.xuetangx.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==
`;

export default defineConfig(({ mode }) => {
  let minify = true;
  let suffix = ".min";
  let devMode = false;

  if (mode === "development") {
    minify = false;
    suffix = ".dev";
    devMode = true;
  }

  return {
    define: {
      __DEV_MODE: JSON.stringify(devMode),
      __VERSION: JSON.stringify(VERSION),
    },
    build: {
      emptyOutDir: false,
      minify,
      lib: {
        entry: path.relative(__dirname, "src/main.ts"),
        name: NAME,
      },
      rollupOptions: {
        output: {
          format: "umd",
          entryFileNames: `yuk${suffix}.user.js`,
        },
      },
    },
    plugins: [
      solidPlugin({ solid: { delegateEvents: false } }),
      {
        name: "no-css",
        apply: "build",
        enforce: "post",
        generateBundle(_, bundles) {
          for (const [k, bundle] of Object.entries(bundles)) {
            if (bundle.type === "asset" && bundle.fileName.endsWith(".css")) {
              delete bundles[k];
            }
          }
        },
      },
      {
        name: "banner",
        generateBundle(_, bundles) {
          for (const bundle of Object.values(bundles)) {
            if (bundle.type === "asset") {
              continue;
            }
            const { code, fileName } = bundle;
            if (/.+\.user\.js$/.test(fileName)) {
              bundle.code = BANNER + code;
            }
          }
        },
      },
    ],
  };
});
