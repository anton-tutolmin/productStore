const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  productname: String,
  description: String,
  coast: Number,
  img: String,
  orderedCount: Number,
});

module.exports = model('products', ProductSchema);
