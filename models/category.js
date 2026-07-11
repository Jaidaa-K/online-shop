const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'The category name is required']
    },
    description: {
      type: String,
      required: false
    },
    slug: {
      type: String,
      required: [true, 'The category slug is required'],
      unique: true
    }
  },
  { 
    timestamps: true 
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;