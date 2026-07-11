const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  clearCart,
  removeCartItem
} = require('../controllers/cartController');

router
  .route('/')
  .get(getCart)
  .delete(clearCart)
  .post(addToCart);

router
  .route('/:productId')
  .delete(removeCartItem)
  .patch(updateCartItem)

module.exports = router;