import { babel } from "@rollup/plugin-babel";

export default {
  input: "./client.js",
  output: {
    file: "bundle.js",
    format: "esm",
  },
  plugins: [babel({ babelHelpers: "bundled" })],
  include: "client.js",
};
