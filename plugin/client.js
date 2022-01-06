import io from "socket.io-client";

const socket = io.connect("ws://localhost:8888");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

window.onload = function () {
  const dev = document.querySelector("#kissdev");
  const project_id = dev.getAttribute("project_id");
  const hash = dev.getAttribute("hash");
  const ref = dev.getAttribute("ref");
  setInterval(() => {
    socket.emit("update", { project_id, hash, ref });
  }, 10000);
  socket.on(socket, (...rest) => {
    console.log(...rest);
    if (rest.hash !== hash) {
      alert("page is expired");
    }
  });
};
