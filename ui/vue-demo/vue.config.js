const devlatest = require("devlatest");

module.exports = {
  chainWebpack: (config) => {
    config.plugin("kissdev").use(devlatest);
  },
};
