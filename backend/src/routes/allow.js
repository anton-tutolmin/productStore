const errors = require('../errors/errors');

module.exports = (err, user, msg, id) => {
  if (err) throw new Error(err);
  if (msg) throw new Error(msg.message);
  if (user.type !== 3 && (!id || id != user._id)) {
    throw new Error(errors.notAllowedAdress);
  }
};
