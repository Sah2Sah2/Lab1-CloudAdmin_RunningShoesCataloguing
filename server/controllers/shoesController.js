const shoesModel = require('../models/shoesModel');

// GET all shoes
exports.getAllShoes = (req, res) => {
  shoesModel.getAllShoes((err, results) => {
    if (err) {
      console.error('Error fetching shoes:', err);
      return res.status(500).json({ error: 'Database query failed', details: err.message });
    }
    res.json(results);
  });
};

// ADD shoe 
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

// UPDATE shoe 
exports.updateShoe = (req, res) => {
  console.log('INSIDE UPDATE ROUTE');
  console.log('req.params:', req.params);
  console.log('req.body:', req.body);

  const { id } = req.params;
  const updatedShoe = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing shoe ID in URL' });
  }

  if (updatedShoe.first_use) {
    updatedShoe.first_use = updatedShoe.first_use.substring(0, 10);
  }

  shoesModel.updateShoe(id, updatedShoe, (err, result) => {
    if (err) {
      console.error('Error updating shoe:', err);
      return res.status(500).json({ error: 'Failed to update shoe' });
    }

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ error: 'Shoe not found' });
    }

    res.json({ id: +id, ...updatedShoe });
  });
};

// DELETE shoe
exports.deleteShoe = (req, res) => {
  const { id } = req.params;

  shoesModel.deleteShoe(id, (err, result) => {
    if (err) {
      console.error('Error deleting shoe:', err);
      return res.status(500).json({ error: 'Failed to delete shoe' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Shoe not found' });
    }

    res.json({ message: 'Shoe deleted', id: +id });
  });
};

