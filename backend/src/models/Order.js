const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  status: String,
  clientId: String,
  curierId: String,
  productId: String,
});

module.exports = model('orders', OrderSchema);
