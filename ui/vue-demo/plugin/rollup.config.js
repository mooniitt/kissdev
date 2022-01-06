import { babel } from "@rollup/plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
export default {
  input: "./client.js",
  output: {
    file: "bundle.js",
  },
  plugins: [
    resolve(),
    uglify(),
    babel({ babelHelpers: "bundled" }),
    commonjs({
      include: ["node_modules/socket.io-client/dist/socket.io.js"],
    }),
  ],
};
