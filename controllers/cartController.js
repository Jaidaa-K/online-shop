const Product = require('../models/product');
const Cart = require('../models/cart');
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/appError");

// @desc    Get cart
// @route   GET /api/cart
exports.getCart = asyncHandler(async (req, res, next) => {

    const cart = await Cart
        .find()
        .populate("items.product");
    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Cart retrieved successfully",
      data: cart
    });
});

// @desc    Add a Cart item
// @route   POST /api/cart
exports.addToCart = asyncHandler(async (req, res, next) => {

    const { product, quantity } = req.body;
    const productDoc = await Product.findById(product);
    if (!productDoc) {
        return next(new AppError("Product not found", 404));
    }

    let cart = await Cart.findOne();
    if (!cart) {
        cart = new Cart({
            items: [],
            totalPrice: 0
        });
    }

    const item = cart.items.find(
        item => item.product.toString() === product
    );

    if (item) {
        item.quantity += quantity;
    } else {
        cart.items.push({
            product,
            quantity,
            price: productDoc.price
        });
    }

    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    await cart.save();
    res.status(200).json({
        status: "success",
        data: cart
    });

});
// @desc    Update cart items
// @route   PATCH /api/cart/:productId
exports.updateCartItem = asyncHandler(async (req, res, next) => {

    const { quantity } = req.body;
    if (quantity < 1) {
    return next(new AppError("Quantity must be at least 1", 400));
    }
    const cart = await Cart.findOne();
    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }
    const item = cart.items.find(
        item => item.product.toString() === req.params.productId
    );
    if (!item) {
        return next(new AppError("Item not found in cart", 404));
    }
    item.quantity = quantity;
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    await cart.save();
    res.status(200).json({
    status: "success",
    message: "Cart updated successfully",
    data: cart
    });
});

// @desc    Delete a Cart
// @route   DELETE /api/cart/:productId
exports.removeCartItem = asyncHandler(async (req, res, next) => {

    const cart = await Cart.findOne();
    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }
    cart.items = cart.items.filter(
        item => item.product.toString() !== req.params.productId
    );
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    await cart.save();
    res.status(200).json({
        status: "success",
        message: "Item removed from cart",
        data: cart
    });
});

// @desc    Clear Cart
// @route   DELETE /api/cart
exports.clearCart = asyncHandler(async (req, res, next) => {

    const cart = await Cart.findOne();
    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    res.status(200).json({
        status: "success",
        message: "Cart cleared",
        data: cart
    });
});
