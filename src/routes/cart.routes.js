const express = require('express');
const CartController = require('../controllers/CartController');
const verificarToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verificarToken, CartController.getCart);
router.post('/', verificarToken, CartController.addToCart);
router.put('/:id', verificarToken, CartController.updateQuantity);
router.delete('/:id', verificarToken, CartController.removeFromCart);

module.exports = router;