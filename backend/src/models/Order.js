const {Schema, model} = require('mongoose');

const OrderSchema = new Schema({
  status: String,
  authorId: String,
  productId: String
});

module.exports = model('orders', OrderSchema);