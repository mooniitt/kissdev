const cors = require("cors");
const ioServer = require("socket.io");
const bodyParser = require("body-parser");

const { insert, query, update, read } = require("./mysql");

const { app } = require("./app");

const { HTTP, SOCKET, EVENT } = require("../constant");

require("../socket-server");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.all("/expired", (req, res) => {
  console.log(req.body);
  res.send("doc is expired, please refresh");
});

// hook请求写入到数据库
app.all("/webhook", (req, res) => {
  const { ref, project_id, hash } = req.body;
  read({ ref, project_id }, (err, res) => {
    if (res.length) {
      update({ ref, project_id, hash }, () => res.sendStatus(200));
    } else {
      insert({ ref, project_id, hash }, () => res.sendStatus(200));
    }
  });
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
    // console.log(info);
    query(info, (err, res) => {
      if (err) throw err;
      if (res.length === 0) {
        socket.emit("expired", "page is expired");
      }
    });
  });
  socket.emit("broadcast", " well done ");
});
