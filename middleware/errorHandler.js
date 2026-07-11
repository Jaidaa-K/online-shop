const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        err = new AppError("Invalid ID format", 400);
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        err = new AppError(err.message, 400);
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        err = new AppError("Duplicate field value entered", 400);
    }

    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message || "Server Error"
    });
};