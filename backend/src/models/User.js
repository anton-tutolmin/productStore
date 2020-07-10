const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
});

UserSchema.methods.validatePassword = async function (username, password) {
  const user = await model('users').find({username});

  if (!hash) {
    throw new Error('No such user');
  }
  const valid = await bcrypt.compare(password, user.password);

  return valid;
}

UserSchema.methods.saveWithHashPassword = async function (user, cb) {
  const saltRound = process.env.SALT_ROUND;
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(user.password, salt);
  await model('users').create({
    username: user.username,
    email: useremail,
    phone: user.phone,
    password: hash
  });
}

module.exports = model('users', UserSchema);