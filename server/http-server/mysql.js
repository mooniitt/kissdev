var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "101.34.105.254",
  user: "user",
  password: "3110932m",
  database: "dev",
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("mysql in connected");
});

function insert({ project_id, ref, hash }, callback) {
  var sql = `INSERT INTO branch_info (project_id, ref, hash) VALUES ('${project_id}', '${ref}','${hash}')`;
  connection.query(sql, function (err, result) {
    callback(err);
    if (err) {
      throw err;
    }
    console.log("1 record inserted");
  });
}

function query({ project_id, ref, hash }, callback) {
  var sql = `SELECT * FROM customers WHERE project_id = ${project_id} AND ref = ${ref}';`;
  connection.query(sql, function (err, result) {
    callback(err, result);
    if (err) {
      throw err;
    }
  });
}

module.exports = {
  connection,
  insert,
  query,
};