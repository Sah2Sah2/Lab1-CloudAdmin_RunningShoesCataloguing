const db = require('../db/connection');  

// Get all shoes
exports.getAllShoes = (callback) => {
  db.query('SELECT * FROM running_shoes', callback);
};

// Add shoe
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
  const fields = [];
  const values = [];

  if (updatedShoe.name !== undefined) {
    fields.push('name = ?');
    values.push(updatedShoe.name);
  }
  if (updatedShoe.brand !== undefined) {
    fields.push('brand = ?');
    values.push(updatedShoe.brand);
  }
  if (updatedShoe.model !== undefined) {
    fields.push('model = ?');
    values.push(updatedShoe.model);
  }
  if (updatedShoe.first_use !== undefined) {
    fields.push('first_use = ?');
    values.push(updatedShoe.first_use);
  }
  if (updatedShoe.races_used !== undefined) {
    fields.push('races_used = ?');
    values.push(updatedShoe.races_used);
  }
  if (updatedShoe.image_url !== undefined) {
    fields.push('image_url = ?');
    values.push(updatedShoe.image_url);
  }
  if (updatedShoe.vote !== undefined) {
    fields.push('vote = ?');
    values.push(updatedShoe.vote);
  }

  if (fields.length === 0) {
    return callback(new Error('No fields to update'));
  }

  const query = `UPDATE running_shoes SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);

  db.query(query, values, callback);
};

// Delete shoe by id
exports.deleteShoe = (id, callback) => {
  const query = "DELETE FROM running_shoes WHERE id = ?";
  db.query(query, [id], callback);
};
