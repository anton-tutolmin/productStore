const errors = require('../errors/errors');

class UserValidationService {
  validateCreateBody(body) {
    this.validateUsername(body.username);
    this.validatePassword(body.password);
    this.validateEmail(body.email);
    this.validatePhone(body.phone);
  }

  validateUpdateBody(params) {
    for (const param of Object.keys(params)) {
      if (param === 'username') this.validateUsername(params[param]);
      if (param === 'email') this.validateEmail(params[param]);
      if (param === 'phone') this.validatePhone(params[param]);
      if (param === 'balance') this.validateBalance(params[param]);
    }
  }

  validatePassword(password) {
    if (!password || password.length === 0) {
      throw new Error(errors.notCorrectPassword);
    }
  }

  validateUsername(username) {
    if (!username || username.length < 5 || username.match(/[^\w]/g)) {
      throw new Error(errors.notCorrectUsername);
    }
  }

  validatePhone(phone) {
    if (
      !phone ||
      typeof phone !== 'string' ||
      phone.length !== 11 ||
      phone.match(/[^0-9]/g)
    ) {
      throw new Error(errors.notCorrectPhone);
    }
  }

  validateEmail(email) {
    if (
      !email ||
      typeof email !== 'string' ||
      !email.match(/\w{5,}@(gmail|yandex).(ru|com)/g)
    ) {
      throw new Error(errors.notCorrectEmail);
    }
  }

  validateBalance(balance) {
    if (!balance || typeof balance !== 'number' || balance < 0) {
      throw new Error(errors.notCorrectBalance);
    }
  }
}

module.exports = {
  UserValidationService,
  userValidationService: new UserValidationService(),
};
