const db = require('../db/connection');

exports.getAllShoes = (callback) => {
  db.query('SELECT * FROM running_shoes', callback);
};

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
