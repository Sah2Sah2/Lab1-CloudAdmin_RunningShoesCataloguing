const db = require('../db/connection');

exports.getAllShoes = (req, res) => {
  db.query('SELECT * FROM running_shoes', (err, results) => {
    if (err) {
      console.error('Error fetching shoes:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
};

exports.addShoe = (req, res) => {
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
};
