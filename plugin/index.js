const fs = require("fs");
const {
  resolve
} = require("path");
const hash = require("object-hash");
const {
  createHtmlTagObject
} = require("./html-tags");

function trainCaseToCamelCase(word) {
  return word.replace(/-([\w])/g, function (match, p1) {
    return p1.toUpperCase();
  });
}

function tapCompilationEvent(compilation, eventName, handler) {
  // Webpack 4 has a new interface
  if (compilation.hooks) {
    return compilation.hooks[trainCaseToCamelCase(eventName)].tapAsync(
      "AsyncPlugin" + tapCompilationEvent.counter++,
      handler
    );
  } else {
    return compilation.plugin(eventName, handler);
  }
}

class DevLatest {
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.plugin("compilation", function (compilation) {
      tapCompilationEvent(
        compilation,
        "html-webpack-plugin-alter-asset-tags",
        function (pluginArgs, callback) {
          pluginArgs.body.push(
            createHtmlTagObject(
              "script", {},
              fs.readFileSync(resolve(__dirname, "bundle.js"))
            )
          );
          const timestamp = `${new Date().getTime()}`;
          pluginArgs.body.push(
            createHtmlTagObject("div", {
              id: "kissdev",
              project_id: 4435,
              ref: "refs/heads/master",
              hash: hash({
                project_id: 4435,
                timestamp
              }),
            })
          );
          callback(null, pluginArgs);
        }
      );
    });
  }
}

module.exports = DevLatest;