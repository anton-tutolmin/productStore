const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
});

module.exports = model('orders', OrderSchema);