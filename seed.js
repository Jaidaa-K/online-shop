require("dotenv").config();

const connectDB = require("./db/db");
const mongoose = require("mongoose");
const Product = require("./models/product");
const Category = require("./models/category");
const Order = require("./models/order");

const seed = async () => {
    await connectDB();

    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    // Category seed
    const categories = [
        {
            name: "Accessories",
            description: "Mobile and desktop accessories",
            slug: "accessories"
        },
        {
            name: "Phones",
            description: "Smartphones and mobile devices",
            slug: "phones"
        },
        {
            name: "Laptops",
            description: "Laptops and notebooks",
            slug: "laptops"
        }
    ];
    const createdCategories = await Category.insertMany(categories);

    // Product seed
    const products = [
        {
            name: "Laptop",
            description: "High performance laptop",
            price: 1035,
            stock: 8,
            images: ["laptop.jpg"],
            inStock: true,
            category: createdCategories[2]._id
        },
        { 
            name: 'MacBook',
            description: 'MacBook pro',
            price: 1035,
            stock: 10,
            images: ["macbook.jpg"],
            inStock: true,
            category: createdCategories[2]._id
        },
        { 
            name: 'Smartphone', 
            description: 'Latest model smartphone',
            price: 699, 
            stock: 13,
            images: ["smartphone.jpg"],
            inStock: true,
            category: createdCategories[1]._id
        },
        { 
            name: 'iPhone', 
            description: 'Iphone 17 pro',
            price: 1523, 
            stock: 5,
            images: ["iphone.jpg"],
            inStock: true,
            category: createdCategories[1]._id
        },
        { 
            name: 'Headphones', 
            description: 'Noise cancelling headphones',
            price: 199, 
            stock: 15,
            images: ["headphones.jpg"],
            inStock: true,
            category: createdCategories[0]._id
        },
        { 
            name: 'Mouse', 
            description: 'Wireless mouse',
            price: 30, 
            stock: 20,
            images: ["mouse.jpg"],
            inStock: true,
            category: createdCategories[0]._id
        },
    ];
    const createdProducts = await Product.insertMany(products);

    // Order seed
    const orders = [
        {
            orderNumber: "ORD-1001",
            items: [
                {
                    product: createdProducts[0]._id,
                    quantity: 2,
                    price: createdProducts[0].price
                },
                {
                    product: createdProducts[4]._id,
                    quantity: 1,
                    price: createdProducts[4].price
                }
            ],
            totalPrice:
                createdProducts[0].price * 2 +
                createdProducts[4].price,
            shippingAddress: "Egypt"
        }
    ];
    await Order.insertMany(orders);

    console.log(`${categories.length} categories seeded.`);
    console.log(`${products.length} products seeded.`);
    console.log(`${orders.length} orders seeded.`);

    console.log("Database seeded successfully.");
    
    await mongoose.disconnect();
    process.exit(0);
};
seed();