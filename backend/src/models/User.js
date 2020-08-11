const {Schema, model, Mongoose, startSession} = require('mongoose');

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  type: Number,
});

module.exports = model('users', UserSchema);