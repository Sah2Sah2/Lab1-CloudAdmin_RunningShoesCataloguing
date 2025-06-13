console.log('Loading shoes router');

const express = require('express');
const router = express.Router();
const shoesController = require('../controllers/shoesController');

router.get('/test', (req, res) => {
  res.send('Shoes route test works!');
});

router.get('/', shoesController.getAllShoes);
router.post('/', shoesController.addShoe);

module.exports = router;
