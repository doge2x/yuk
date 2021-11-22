const esbuild = require("esbuild");
const pkg = require("./package.json");

const banner = `\
// ==UserScript==
// @name         ${pkg.name}
// @version      ${pkg.version}
// @match        https://examination.xuetangx.com/exam/*
// @grant        GM.getValue
// @grant        GM.setValue
// @run-at       document-start
// ==/UserScript==
`;

const input = __dirname + "/src/index.ts";
const outputDir = __dirname + "/../dist";

esbuild
  .build({
    entryPoints: [input],
    banner: { js: banner },
    bundle: true,
    legalComments: "none",
    outfile: `${outputDir}/${pkg.name}.user.js`,
  })
  .catch(() => process.exit());

esbuild
  .build({
    entryPoints: [input],
    banner: { js: banner },
    minify: true,
    bundle: true,
    legalComments: "none",
    outfile: `${outputDir}/${pkg.name}.min.user.js`,
  })
  .catch(() => process.exit());
