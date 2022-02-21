"use strict";
window.onload = function () {
  var t = document.querySelector("#kissdev"),
    e = t.getAttribute("project_name"),
    o = t.getAttribute("hash");
  t.getAttribute("ref");
  var n = io.connect("ws://101.35.85.83:8080/webhook");
  n.on("connect", function () {
    console.log(n.id);
  }),
    n.on("broadcast", function () {
      var t;
      (t = console).log.apply(t, arguments);
    }),
    n.on("expired", function (t) {
      alert(t);
    }),
    setInterval(function () {
      n.emit("update", { project_name: e, hash: o }),
        console.log(
          'socket.emit("update", { project_name : '
            .concat(e, ", hash: ")
            .concat(o, " })")
        );
    }, 5e3);
};
