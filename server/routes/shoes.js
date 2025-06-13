const express = require('express');
const router = express.Router();
const { getAllShoes, addShoe } = require('../controllers/shoesController');

router.get('/', getAllShoes);
router.post('/', addShoe);

module.exports = router;
