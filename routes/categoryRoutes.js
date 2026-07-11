const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  replaceCategory,
  deleteCategory,
  getCategory
} = require('../controllers/categoryController');

router
  .route('/')
  .get(getCategories)
  .post(createCategory);

router
  .route('/:id')
  .put(replaceCategory)
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;