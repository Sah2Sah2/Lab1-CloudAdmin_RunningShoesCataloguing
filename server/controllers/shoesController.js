const shoesModel = require('../models/shoesModel');

exports.getAllShoes = (req, res) => {
  shoesModel.getAllShoes((err, results) => {
    if (err) {
      console.error('Error fetching shoes:', err);
      return res.status(500).json({ error: 'Database query failed', details: err.message });
    }
    res.json(results);
  });
};

exports.addShoe = (req, res) => {
  const shoe = req.body;

  if (!shoe.name || !shoe.brand || !shoe.model) {
    return res.status(400).json({ error: 'Name, brand and model are required' });
  }

  shoesModel.addShoe(shoe, (err, result) => {
    if (err) {
      console.error('Error inserting shoe:', err);
      return res.status(500).json({ error: 'Failed to add shoe' });
    }

    res.json({ id: result.insertId, ...shoe });
  });
};
