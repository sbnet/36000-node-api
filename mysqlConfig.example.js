var mysql = require('mysql');

// https://github.com/mysqljs/mysql#introduction
// Connect to mysql
var connection = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "36000"
});

module.exports = {
  connection,
  mysql
};
