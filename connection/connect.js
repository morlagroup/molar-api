const sql = require("mssql");
const config = require("../config.json");
const connect = function() {
  const conn = new sql.ConnectionPool({
    user: config.user, //"administrator",
    password: config.password, //"LUL0BchAThePHVziQjP9$Y49wPb^2ABQI%d",
    server: config.server, //"morla-dev.ct73sprczork.us-east-2.rds.amazonaws.com",
    database: config.database //"morla-dev"
  });

  return conn;
};

module.exports = connect;
