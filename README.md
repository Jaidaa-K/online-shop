#Online Shop Backend API

## Project Description

A RESTful E-Commerce Backend API built using Node.js, Express.js, MongoDB, and Mongoose. The project provides complete backend functionality for managing categories, products, shopping carts, and customer orders.

Tech Stack:

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS
- express-mongo-sanitize 

Features

- Categories CRUD API
- Products CRUD API
- Product filtering
- Shopping Cart API
- Orders API
- Checkout flow
- Stock validation
- Global error handling
- MongoDB integration
- Input validation

---

Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- MongoDB Community Server

---

Installation

Move into the project folder:

cd online-shop

Install dependencies:

npm install

Create a ".env" file in the project root.

Seed the database:

	npm run seed

or
	
	node seed.js

Start the server:

	npm run dev

or

	node server.js

---

Environment Variables

Variable| Description| Example
|--------------|----------------|--------|
PORT| Server port| 3000
MONGO_URI| MongoDB connection string| mongodb://localhost:27017/online-shop
NODE_ENV| Application environment| development

Example ".env"

PORT=3000
MONGO_URI=mongodb://localhost:00000/example
NODE_ENV=development

---

API Endpoints

Categories

Method| Endpoint| Description
|--------------|----------------|--------|
GET| /api/categories| Get all categories
GET| /api/categories/:id| Get category by ID
POST| /api/categories| Create category
PUT| /api/categories/:id| Replace category
PATCH| /api/categories/:id| Update category
DELETE| /api/categories/:id| Delete category

Products

Method| Endpoint| Description
|--------------|----------------|--------|
GET| /api/products| Get all products
GET| /api/products/:id| Get product by ID
POST| /api/products| Create product
PUT| /api/products/:id| Replace product
PATCH| /api/products/:id| Update product
DELETE| /api/products/:id| Delete product

Product Filtering

GET /api/products?category=<categoryId>&minPrice=100&maxPrice=500&search=phone&inStock=true

Supported filters:

- category
- minPrice
- maxPrice
- search
- inStock

Cart

Method| Endpoint| Description
|--------------|----------------|--------|
GET| /api/cart| Get cart
POST| /api/cart| Add product to cart
PATCH| /api/cart/:id| Update cart item quantity
DELETE| /api/cart/:id| Remove cart item
DELETE| /api/cart| Clear cart

Orders

Method | Endpoint | Description
|--------------|----------------|--------|
POST | /api/orders | Create order
GET | /api/orders | Get all orders
GET | /api/orders/:id | Get order by ID
PATCH | /api/orders/:id/status | Update order status

---

Project Structure

online-shop/
│
├── controllers/
├── db/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── seed.js
├── server.js
└── README.md

---

Testing

The API was tested using Postman. All CRUD operations, filtering, cart management, checkout flow, and error handling were successfully verified.
