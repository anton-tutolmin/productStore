const { Schema, model } = require('mongoose');

const CurierSchema = new Schema({
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
  password: {
    type: String,
  },
  status: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
    index: true,
  },
  balance: {
    type: Number,
  },
});

module.exports = model('curiers', CurierSchema);
