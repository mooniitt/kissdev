io.connect("ws://localhost:8888");
console.log(a?.b?.s);
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
socket.on("broadcast", (...rest) => {
  console.log(...rest);
});
