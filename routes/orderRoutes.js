const express = require('express');
const router = express.Router();

const { 
    getOrders,
    createOrder, 
    getOrder,
    updateOrderStatus
} = require('../controllers/orderController');

router
  .route('/')
  .get(getOrders)
  .post(createOrder);

router
  .route('/:id')
  .get(getOrder);

router
    .route('/:id/status')
    .patch(updateOrderStatus);
    
module.exports = router;