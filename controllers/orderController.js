const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/appError");

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = asyncHandler(async (req, res, next) => {

    const orders = await Order.find()
        .populate("items.product", "name price");

    res.status(200).json({
        status: "success",
        count: orders.length,
        data: orders
    });

});

// @desc    Get order by ID
// @route   GET /api/orders/:id
exports.getOrder = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id)
        .populate("items.product", "name price");

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: order
    });

});

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {

    const { status } = req.body;

    const validStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ];

    if (!validStatuses.includes(status)) {
        return next(new AppError("Invalid order status", 400));
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
        status: "success",
        message: "Order status updated successfully",
        data: order
    });

});

// @desc    Create order
// @route   POST /api/order
exports.createOrder = asyncHandler(async (req, res, next) => {
    const cart = await Cart
        .findOne()
        .populate("items.product");
    
    if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
    }

    const { shippingAddress } = req.body;
    if (!shippingAddress) {
        return next(
            new AppError("Shipping address is required", 400)
        );
    }

    let totalPrice = 0;
    for (const item of cart.items) {
        if (item.quantity > item.product.stock) {
            return next(
                new AppError(
                    `Not enough stock for ${item.product.name}s`,
                    400
                )
            );
        }
        item.product.stock -= item.quantity;
        await item.product.save();

        totalPrice += item.price * item.quantity;
    }
    const order = await Order.create({
        orderNumber: "ORD-" + Date.now(),
        items: cart.items,
        totalPrice,
        shippingAddress
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
        status: "success",
        message: "Order created",
        data: order
    });
});