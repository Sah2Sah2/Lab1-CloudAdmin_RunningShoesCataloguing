const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const shoesRoutes = require('./routes/shoes'); 

app.use('/api/shoes', (req, res, next) => {
  console.log(`Received request at /api/shoes${req.url} with method ${req.method}`);
  next();
});

app.use('/api/shoes', shoesRoutes);

app.get('/api/shoes/inline', (req, res) => {
  res.send('Inline shoes route works!');
});

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});