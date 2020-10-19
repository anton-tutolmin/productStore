const { Schema, model } = require('mongoose');

const CurierSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = model('curiers', CurierSchema);
