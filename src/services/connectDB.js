const mysql = require('mysql2/promise');

// create the connection to database
const connection =  mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b0c880b56c3ba4',
  password: '6c62b14e',
  database : 'heroku_a20f59501d2e9b9'
});

module.exports = connection;

// mysql://b0c880b56c3ba4:6c62b14e@us-cdbr-east-05.cleardb.net/heroku_a20f59501d2e9b9?reconnect=true