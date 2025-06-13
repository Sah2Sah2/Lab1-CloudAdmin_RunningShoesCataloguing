const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydatabase'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');

  db.query('SELECT CURRENT_USER(), DATABASE()', (err, results) => {
    if (!err && results.length) {
      console.log('User:', results[0]['CURRENT_USER()']);
      console.log('Database:', results[0]['DATABASE()']);
    }
  });
});

module.exports = db;
