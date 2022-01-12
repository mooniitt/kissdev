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
app.all("/webhook", (req, response) => {
  const { ref, checkout_sha, project } = req.body;
  const project_name = project.name;
  read({ ref, project_name }, (err, res) => {
    if (res.length) {
      update({ ref, project_name, hash: checkout_sha }, () =>
        response.sendStatus(200)
      );
    } else {
      insert({ ref, project_name, hash: checkout_sha }, () =>
        response.sendStatus(200)
      );
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
  socket.on("update", (info) => {
    // console.log(info);
    const { project_name, hash } = info;
    query({ project_name, hash }, (err, res) => {
      if (err) throw err;
      if (res.length === 0) {
        socket.emit("expired", "page is expired");
      }
    });
  });
  socket.emit("broadcast", " well done ");
});
