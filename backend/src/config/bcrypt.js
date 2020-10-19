const bcrypt = require('bcrypt');

const saltRounds = 10;

const Bcrypt = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  validatePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
};

module.exports = Bcrypt;
