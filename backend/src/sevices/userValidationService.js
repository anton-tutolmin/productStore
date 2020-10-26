const errors = require('../errors/errors');

class UserValidationService {
  validateCreateClient({ username, password, email, phone, balance }) {
    this.validateUsername(username);
    this.validatePassword(password);
    this.validateEmail(email);
    this.validatePhone(phone);
    this.validateBalance(balance);
  }

  validateCreateCurier({ username, password, email, phone, balance, status }) {
    this.validateUsername(username);
    this.validatePassword(password);
    this.validateEmail(email);
    this.validatePhone(phone);
    this.validateStatus(status);
    this.validateBalance(balance);
  }

  validateUpdateBody(params) {
    for (const param of Object.keys(params)) {
      if (param === 'username') this.validateUsername(params[param]);
      if (param === 'email') this.validateEmail(params[param]);
      if (param === 'phone') this.validatePhone(params[param]);
      if (param === 'balance') this.validateBalance(params[param]);
      if (param === 'status') this.validateStatus(params[param]);
    }
  }

  validatePassword(password) {
    if (!password || password.length < 1) {
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

  validateStatus(status) {
    if (
      !status ||
      typeof status !== 'string' ||
      (status !== 'open' && status !== 'close')
    ) {
      throw new Error(errors.notCorrectStatus);
    }
  }
}

module.exports = {
  UserValidationService,
  userValidationService: new UserValidationService(),
};
