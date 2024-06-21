const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand_image: {
    type: String
  }
  // Add more fields as needed
});

const BrandModel = mongoose.model('Brand', BrandSchema);

module.exports = BrandModel;


