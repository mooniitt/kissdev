const io = require("socket.io-client");

const { SOCKET } = require("../constant");

const { app } = require("../http-server/app");

app.get("/socket", (req, res) => {
  const socket = io(SOCKET.URL);
  socket.on("connect", () => {
    socket.close();
    res.sendStatus(204);
  });
});
