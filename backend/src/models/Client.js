const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: String,
  phone: {
    type: String,
    unique: true,
    index: true,
  },
  balance: Number,
});

module.exports = model('clients', ClientSchema);
