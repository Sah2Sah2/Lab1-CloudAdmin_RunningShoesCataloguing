console.log('Loading shoes router');
console.log('✅ shoesRouter.js is being loaded!');

const express = require('express');
const router = express.Router();

//  Debbugging
router.put('/ping/:id', (req, res) => {
  console.log('🔍 PING endpoint hit, params:', req.params);
  res.json({ params: req.params });
});


const shoesController = require('../controllers/shoesController');

// Debugging middleware inside router for /:id routes
router.use('/:id', (req, res, next) => {
  console.log('DEBUG shoes router req.params:', req.params);
  next();
});

router.get('/test', (req, res) => {
  res.send('Shoes route test works!');
});

router.get('/', shoesController.getAllShoes);
router.post('/', shoesController.addShoe);
router.put('/:id', shoesController.updateShoe);
router.delete('/:id', shoesController.deleteShoe);

module.exports = router;
