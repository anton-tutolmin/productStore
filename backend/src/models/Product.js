const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  productname: String,
  description: String,
  coast: Number,
  img: String,
});

module.exports = model('products', ProductSchema);
