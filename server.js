require("dotenv").config();

const express = require("express");
const cors = require('cors');
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./db/db");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/appError");

const app = express();

// Connect Database
connectDB();

// Body Parser
app.use(express.json());

// Enable CORS
app.use(cors());

// mongo-sanitize crashes Express as Express (version 5) make req.query read-only.
// This block of code creates a writable copy so express-mongo-sanitize can modify it.
app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
        value: { ...req.query },
        writable: true,
        configurable: true,
        enumerable: true,
    });
    next();
});

// Mongo Sanitize
app.use(mongoSanitize());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// 404 Handler
app.all('/{*splat}', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});