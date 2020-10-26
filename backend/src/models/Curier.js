const { Schema, model } = require('mongoose');

const CurierSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
  },
  phone: {
    unique: true,
    type: String,
  },
  balance: {
    type: Number,
  },
});

module.exports = model('curiers', CurierSchema);
