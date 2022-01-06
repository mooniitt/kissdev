import "socket.io-client/dist/socket.io.js";

const socket = io.connect("ws://localhost:8888");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
socket.on("broadcast", (...rest) => {
  console.log(...rest);
});
