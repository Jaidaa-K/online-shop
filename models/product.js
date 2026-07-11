const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The product name is required.'],
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: [true, 'The product price is required.'],
    min: [0, 'Price must be positive.']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required.'],
    default: 0,
    min: [0, 'Stock cannot be negative.']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'The product category is required.'],
    trim: true
  },
  images: [String],
  inStock: {
    type: Boolean,
    default: true,
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;