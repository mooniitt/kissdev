import io from "socket.io-client";

const socket = io.connect("ws://localhost:8888");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("broadcast", (...rest) => {
  console.log(...rest);
  // if (rest.hash !== hash) {
  //   alert("page is expired");
  // }
});

socket.on("expired", (msg) => {
  alert(msg);
});

window.onload = function () {
  const dev = document.querySelector("#kissdev");
  const project_id = dev.getAttribute("project_id");
  const hash = dev.getAttribute("hash");
  const ref = dev.getAttribute("ref");
  socket.emit("update", { project_id, hash, ref });
};
