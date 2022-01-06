// import devlatest from "devlatest";
const devlatest = require("./plugin/index");

module.exports = {
  chainWebpack: (config) => {
    config.plugin("kissdev").use(devlatest);
  },
};
