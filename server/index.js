const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });  // Path to .env
const mysql = require('mysql2');

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
  console.log('Connected to MySQL database');

  // Log the connected user and database
  db.query('SELECT CURRENT_USER(), DATABASE()', (err, results) => {
    if (err) {
      console.error('Error fetching connection info:', err);
      return;
    }
    console.log('Connected as MySQL user:', results[0]['CURRENT_USER()']);
    console.log('Using database:', results[0]['DATABASE()']);
  });
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test root route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// GET all shoes
app.get('/api/shoes', (req, res) => {
  const query = 'SELECT * FROM running_shoes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching shoes:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    console.log('Shoes fetched:', results);
    res.json(results);
  });
});

// POST a new shoe
app.post('/api/shoes', (req, res) => {
  const { name, brand, model, first_use, races_used, image, rating } = req.body;

  if (!name || !brand || !model) {
    return res.status(400).json({ error: 'Name, brand and model are required' });
  }

  const query = `
    INSERT INTO running_shoes (name, brand, model, first_use, races_used, image, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    name,
    brand,
    model,
    first_use || null,
    races_used || null,
    image || null,
    rating || null
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting shoe:', err);
      return res.status(500).json({ error: 'Failed to insert shoe' });
    }

    res.json({ id: result.insertId, ...req.body });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
