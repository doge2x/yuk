import { dirname, esbuild } from "./devDeps.ts";
import pkg from "./package.ts";

const { __dirname } = dirname(import.meta);

const banner = `\
// ==UserScript==
// @name         ${pkg.name}
// @version      ${pkg.version}
// @match        https://examination.xuetangx.com/exam/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==
`;

const input = __dirname + "/src/main.ts";
const outputDir = __dirname + "/../dist";

esbuild
  .build({
    entryPoints: [input],
    banner: { js: banner },
    bundle: true,
    outfile: `${outputDir}/${pkg.name}.user.js`,
  });

await esbuild
  .build({
    entryPoints: [input],
    banner: { js: banner },
    minify: true,
    bundle: true,
    outfile: `${outputDir}/${pkg.name}.min.user.js`,
  });

esbuild.stop();
