const db = require('../db/connection');

// Get all shoes
exports.getAllShoes = (callback) => {
  db.query('SELECT * FROM running_shoes', callback);
};

// Add shoes
exports.addShoe = (shoe, callback) => {
  const { name, brand, model, first_use, races_used, image_url, vote } = shoe;
const query = `
  INSERT INTO running_shoes (name, brand, model, first_use, races_used, image_url, vote)
  VALUES (?, ?, ?, ?, ?, ?, ?)`;
const values = [
  name,
  brand,
  model,
  first_use || null,
  races_used || null,
  image_url || null,
  vote || null
];

  db.query(query, values, callback);
};

// Update shoe by id
exports.updateShoe = (id, updatedShoe, callback) => {
  const { name, brand, model, first_use, races_used, image_url, vote } = updatedShoe;

  const query = `
    UPDATE running_shoes 
    SET name = ?, brand = ?, model = ?, first_use = ?, races_used = ?, image_url = ?, vote = ?
    WHERE id = ?`;

  const values = [
    name,
    brand,
    model,
    first_use || null,
    races_used || null,
    image_url || null,
    vote || null,
    id
  ];

  db.query(query, values, callback);
};

// Delete shoe by id
exports.deleteShoe = (id, callback) => {
  const query = "DELETE FROM running_shoes WHERE id = ?";
  db.query(query, [id], callback);
};
