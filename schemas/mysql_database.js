var mysql = require('mysql');
var dbconf = require('../conf/mysql.conf.json');

var connection = mysql.createPool(dbconf);
connection.getConnection(function(err,connection) {
  if (err) {
    console.log(err);
    connection.release();
    console.info('Error: Could not connect to MySQL.');
    return;
  }
  console.log("连接成功！")
});

exports.connection = connection;
exports.dbname = dbconf.database;