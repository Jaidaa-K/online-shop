const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  replaceProduct,
  deleteProduct,
  getProduct
} = require('../controllers/productController');

router
  .route('/')
  .get(getProducts)
  .post(createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(replaceProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;