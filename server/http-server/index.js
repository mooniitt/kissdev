const cors = require("cors");
const ioServer = require("socket.io");
const bodyParser = require("body-parser");

const { connection, insert } = require("./mysql");

const { app } = require("./app");

const { HTTP, SOCKET, EVENT } = require("../constant");

require("../socket-server");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.all("/expired", (req, res) => {
  res.send("doc is expired, please refresh");
});

// hook请求写入到数据库
app.all("/webhook", (req, res) => {
  const { ref, project_id, hash } = req.body;
  insert({ ref, project_id, hash }, () => res.sendStatus(200));
});

const httpServer = app.listen(HTTP.PORT, () => {
  console.log(`http server is on port ${HTTP.PORT}`);
});

const io = ioServer(httpServer, { cors: true });

io.on("connection", (socket) => {
  console.log("socket id:", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
  socket.on(EVENT.UPDATE, (info) => {
    console.log(info);
    // console.log(`${socket.id}-${EVENT.UPDATE}:${info}`);
  });
  // socket.emit("broadcast", " well done ");
});
