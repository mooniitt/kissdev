const fs = require("fs");
const { resolve } = require("path");
const hash = require("object-hash");
const { createHtmlTagObject } = require("./html-tags");

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
  apply(compiler) {
    compiler.plugin("compilation", function (compilation) {
      tapCompilationEvent(
        compilation,
        "html-webpack-plugin-alter-asset-tags",
        function (pluginArgs, callback) {
          pluginArgs.body.push(
            createHtmlTagObject(
              "script",
              {},
              fs.readFileSync(resolve(__dirname, "bundle.js"))
            )
          );
          const timestamp = `${new Date().getTime()}`;
          pluginArgs.body.push(
            createHtmlTagObject("div", {
              id: "kissdev",
              project_id: 4435,
              ref: "refs/heads/master",
              hash: hash({ project_id: 4435, timestamp }),
            })
          );
          callback(null, pluginArgs);
        }
      );
    });
    // compiler.hooks.compilation.tap("DevLatest", function (compilation) {
    //   // console.log(compilation.hooks);
    //   // if (process.env.NODE_ENV !== "qa") return;
    //   // console.log("qa环境会添加轮询检查资源是否已经过期");
    //   console.log("The compiler is starting a new compilation...");
    //   compilation.plugin(
    //     "html-webpack-plugin-before-html-processing",
    //     (data, cb) => {
    //       console.log("....");
    //       data.html += "The Magic Footer";

    //       cb(null, data);
    //     }
    //   );
    //   //   HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
    //   //     "DevLatest", // <-- Set a meaningful name here for stacktraces
    //   //     (object, cb) => {
    //   //       console.log("asdjsalkdjk....");
    //   //       // Manipulate the content
    //   //       /**
    //   //        *     <script defer="defer" src="/static/js/main.c14da6f2.js"></script>
    //   // <link href="/static/css/main.e6c13ad2.css" rel="stylesheet" />
    //   //        */
    //   //       // object.bodyTags.push(
    //   //       //   HtmlWebpackPlugin.createHtmlTagObject("div", {
    //   //       //     id: "devlatest",
    //   //       //   }),
    //   //       //   HtmlWebpackPlugin.createHtmlTagObject("script", {
    //   //       //     src: "/static/js/main.c14da6f2.js",
    //   //       //     defer: "defer",
    //   //       //   }),
    //   //       //   HtmlWebpackPlugin.createHtmlTagObject("link", {
    //   //       //     href: "/static/css/main.e6c13ad2.css",
    //   //       //     rel: "stylesheet",
    //   //       //   })
    //   //       // );
    //   //       cb(null, object);
    //   //     }
    //   //   );

    //   const timestamp = `${new Date().getTime()}`;
    //   // HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
    //   //   "HtmlWebpackPluginTest",
    //   //   (object, callback) => {
    //   //     console.log(",,,,");
    //   //     eventFiredForSecondPlugin = true;
    //   //     const result = _.extend(object, {
    //   //       html: object.html + " Injected by second plugin",
    //   //     });
    //   //     callback(null, result);
    //   //   }
    //   // );
    //   // compilation.hooks.beforeEmit.tapAsync(
    //   //   "DevLatestStage1",
    //   //   function (c, cb) {
    //   //     console.log("DevLatestStage1");
    //   //     c.head.push({
    //   //       tagName: "meta",
    //   //       attributes: { name: "update-timestamp", content: timestamp },
    //   //     });
    //   //     cb();
    //   //   }
    //   // );
    //   // compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
    //   //   "DevLatestStage2",
    //   //   function (data, cb) {
    //   //     // data.html += `<script>var url='${process.env.VUE_APP_STATIC}config.json';setInterval(fetch(url).then(r=>r.json()).then(r=>console.log(r.version)),3000)</script>`;
    //   //     data.html += `hello devlatest`;
    //   //     cb();
    //   //   }
    //   // );
    // });
  }
}

module.exports = DevLatest;
