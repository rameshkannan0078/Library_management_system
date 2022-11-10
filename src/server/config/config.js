
var mysql = require('mssql');
var connection  = {
  user            : '',
  password        : '',
  server          : '',
  database        : '',
  synchronize: true,
  trustServerCertificate: true,
};

mysql.connect(connection)

var pool = new mysql.Request()

module.exports= pool;
