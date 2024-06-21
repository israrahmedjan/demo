const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand'
  },
  thumbnail: {
    type: String,
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number
  },
  discountPercentage: {
    type: Number
  },
  sku: {
    type: String
  },
  // Add more fields as needed
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
