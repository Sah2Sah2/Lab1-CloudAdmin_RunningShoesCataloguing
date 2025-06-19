const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log('Env DB_HOST:', process.env.DB_HOST);
console.log('Env DB_USER:', process.env.DB_USER);
console.log('Env DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('Env DB_NAME:', process.env.DB_NAME);

function connectWithRetry() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mydatabase',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to MySQL!');

      connection.query('SELECT CURRENT_USER(), DATABASE()', (err, results) => {
        if (!err && results.length) {
          console.log('User:', results[0]['CURRENT_USER()']);
          console.log('Database:', results[0]['DATABASE()']);
        }
      });

      // 👇 Ensure the table exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS running_shoes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          brand VARCHAR(255),
          model VARCHAR(255),
          first_use DATE,
          races_used INT,
          image_url TEXT,
          vote INT
        );
      `;

      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating running_shoes table:', err);
        } else {
          console.log('Table "running_shoes" is ready.');
        }
      });
    }
  });

  connection.on('error', (err) => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Connection lost. Reconnecting...');
      connectWithRetry();
    } else {
      throw err;
    }
  });

  return connection;
}

const db = connectWithRetry();

module.exports = db;
