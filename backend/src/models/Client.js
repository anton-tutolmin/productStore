const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    unique: true,
    type: String,
  },
  password: String,
  phone: {
    type: String,
    unique: true,
  },
  balance: Number,
});

module.exports = model('users', ClientSchema);
