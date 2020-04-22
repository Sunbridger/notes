const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     : '3307',
  password : '123456',
  database : 'dockertest'
});

connection.connect();

connection.query('SELECT * from stu', function (error, results, fields) {
  if (error) throw error;
  console.log(Array.isArray(results), results[0].name);
});
connection.end();
