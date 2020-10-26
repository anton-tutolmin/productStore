const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true,
  },
  email: {
    unique: true,
    type: String,
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

module.exports = model('users', ClientSchema);
