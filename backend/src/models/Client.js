const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: String,
  phone: String,
  balance: Number,
});

module.exports = model('users', ClientSchema);
