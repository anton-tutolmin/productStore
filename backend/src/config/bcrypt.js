const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS;

const Bcrypt = {

  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  validatePassword: async (password, hashedPassword) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }

}

module.exports = Bcrypt;