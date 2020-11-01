const bcrypt = require('bcrypt');

class HashPasswordService {
  constructor(bcrypt, saltRounds) {
    this.bcrypt = bcrypt;
    this.saltRounds = saltRounds;
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = {
  HashPasswordService,
  hashPasswordService: new HashPasswordService(bcrypt, 10),
};
