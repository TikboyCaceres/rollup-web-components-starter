import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/root.js',
	output: [{
		dir: 'dist/module',
		format: 'esm',
    sourcemap: true,
    chunkFileNames: "starter-[hash].esm.js",
    entryFileNames: "[name].esm.js"
	}, {
    dir: "public/build",
    format: "esm",
    sourcemap: true,
    chunkFileNames: "starter-[hash].esm.js",
    entryFileNames: "[name].esm.js",
    plugins: [
      copy({
        targets: [
          { src: "src/assets", dest: "public" },
        ],
        hook: "writeBundle",
      }),
    ], 
  }],
	plugins: [
    del({ targets: ["dist/*", "www/*"] }),
    copy({
      targets: [{ src: "src/assets", dest: "dist" }],
    }),
    postcss({
      plugins: [autoprefixer()],
      inject: false,
    }),
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		production && terser() // minify, but only in production
	]
};