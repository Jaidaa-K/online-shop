const Category = require('../models/category');
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/appError");

// @desc    Get all categories
// @route   GET /api/categories
exports.getCategories = asyncHandler(async (req, res, next) => {

    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      message: "Categories retrieved successfully",
      data: categories
    });
});

// @desc    Create a Category
// @route   POST /api/categories
exports.createCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.create(req.body);
    res.status(201).json({ 
      status: "success",
      message: "Category created", 
      data: category 
    });
});

// @desc    Get category by ID
// @route   GET /api/categories/:id
exports.getCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Category retrieved successfully",
      data: category
    });
});

// @desc    Update all category parameters
// @route   PUT /api/categories/:id
exports.replaceCategory = asyncHandler(async (req, res, next) => {

  const { name, description, slug } = req.body;
  if (!name || !description || !slug) {
    return next(new AppError("Please write all category fields (name, description, slug)", 400));
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
      return next(new AppError("Category not found", 404));
  }

  category.name = req.body.name;
  category.description = req.body.description;
  category.slug = req.body.slug;

  await category.save();

  res.status(200).json({
    status: "success",
    message: "Category replaced successfully",
    data: category
  });
});


// @desc    Partial update for category parameters
// @route   PATCH /api/categories/:id
exports.updateCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!category) {
      return next(new AppError("Category not found", 404));
    }
    res.status(200).json({ 
      status: "success", 
      message: "Category updated", 
      data: category
    });
});

// @desc    Delete a Category
// @route   DELETE /api/categories/:id
exports.deleteCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return next(new AppError("Category not found", 404));
    }
    res.status(200).json({ 
      status: "success", 
      message: "Category deleted", 
      data: null
    });
});