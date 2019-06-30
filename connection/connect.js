const sql = require("mssql");
const config = require("../config.json");
const connect = function() {
  const conn = new sql.ConnectionPool({
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database
  });

  return conn;
};

module.exports = connect;
