
var mysql = require('mssql');
var connection  = {
  user            : 'mzcanteen',
  password        : 'Checkme@987',
  server          : '103.207.1.92',
  database        : 'library',
  synchronize: true,
  trustServerCertificate: true,
};

mysql.connect(connection)

var pool = new mysql.Request()

module.exports= pool;