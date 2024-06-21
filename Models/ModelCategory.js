const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  slug: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

const CatgoeryModel = mongoose.model('Category', categorySchema);

module.exports = CatgoeryModel;


