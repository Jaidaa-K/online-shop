const Product = require('../models/product');
const Category = require('../models/category');
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/appError");

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = asyncHandler(async (req, res, next) => {

    const filter = {};

    // Filter by category
    if (req.query.category) {
        filter.category = req.query.category;
    }

    // Filter by minimum price
    if (req.query.minPrice) {
        filter.price = {
            ...filter.price,
            $gte: Number(req.query.minPrice)
        };
    }

    // Filter by maximum price
    if (req.query.maxPrice) {
        filter.price = {
            ...filter.price,
            $lte: Number(req.query.maxPrice)
        };
    }

    // Filter by stock
    if (req.query.inStock) {
        filter.inStock = req.query.inStock === "true";
    }

    // Search by product name
    if (req.query.search) {
        filter.name = {
            $regex: req.query.search,
            $options: "i"
        };
    }

    const products = await Product.find(filter);

    res.status(200).json({
        status: "success",
        message: "Products retrieved successfully",
        count: products.length,
        data: products
    });

});

// @desc    Create a Product
// @route   POST /api/products
exports.createProduct = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
      return next(new AppError("Category ID is required", 404));
  }
  const product = await Product.create(req.body);
  res.status(201).json({ 
    status: "success",
    message: "Product created", 
    data: product 
  });
});

// @desc    Get product by ID
// @route   GET /api/products/:id
exports.getProduct = asyncHandler(async (req, res, next) => {

    const product = await Product
      .findById(req.params.id)
      .populate("category", "name description");
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Product retrieved successfully",
      data: product
    });

});

// @desc    Update all product parameters
// @route   PUT /api/products/:id
exports.replaceProduct = asyncHandler(async (req, res, next) => {

    const { name, description, price, stock, category, images } = req.body;

    if (!name || !description || !price || stock === undefined || !category || !images) {
        return next(new AppError(
            "Please provide all product fields (name, description, price, stock, category, images)",
            400
        ));
    }

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
        return next(new AppError("Category not found", 404));
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.images = images;

    await product.save();

    res.status(200).json({
        status: "success",
        message: "Product replaced successfully",
        data: product
    });

});

// @desc    Partial update for product parameters
// @route   PATCH /api/products/:id
exports.updateProduct = asyncHandler(async (req, res, next) => {

    if (req.body.category) {

    const category = await Category.findById(req.body.category);

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

}
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(200).json({ 
    status: "success", 
    message: "Product updated", 
    data: product
  });

});

// @desc    Delete a Product
// @route   DELETE /api/products/:id
exports.deleteProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }
    res.status(200).json({ 
      status: "success", 
      message: "Product deleted", 
      data: null
    });
});