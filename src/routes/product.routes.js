const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const verificarToken = require('../middlewares/auth.middleware');


router.get('/', ProductController.list);
router.get('/:id', ProductController.getById);
router.post('/', verificarToken, ProductController.create);
router.put('/:id', verificarToken, ProductController.update);
router.delete('/:id', verificarToken, ProductController.delete);


module.exports = router;