var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: '34.123.1.192',
  user: 'root',
  password: 'team089',
  database: 'teamName2'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Successfully Connected to Database');
})

module.exports = connection;