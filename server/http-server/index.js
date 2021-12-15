const express = require("express");
const bodyParser = require("body-parser");
const { HTTP } = require("../constant");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("/expired", (req, res) => {
  //   console.log(req.body.a);
  res.send("doc is expired, please refresh");
});

app.listen(HTTP.PORT, () => {
  console.log(`http server is on port ${HTTP.PORT}`);
});

module.exports = {
  app,
};
