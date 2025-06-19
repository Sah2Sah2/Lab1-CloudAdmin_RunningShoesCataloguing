const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const shoesRoutes = require('./routes/shoes'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Logging middleware for all /api/shoes requests
app.use('/api/shoes', (req, res, next) => {
  console.log(`Received request at /api/shoes${req.url} with method ${req.method}`);
  next();
});

// Extra debug to verify route usage
app.use('/api/shoes', (req, res, next) => {
  console.log(`DEBUG: Incoming /api/shoes request: ${req.method} ${req.url}`);
  next();
});

// Direct test route for ping 
app.put('/api/shoes/ping/:id', (req, res) => {
  console.log('Direct ping route hit', req.params);
  res.json({ message: 'Direct ping works', id: req.params.id });
});

// Inline route 
app.get('/api/shoes/inline', (req, res) => {
  res.send('Inline shoes route works!');
});

// Attach shoes router to /api/shoes
app.use('/api/shoes', shoesRoutes);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
