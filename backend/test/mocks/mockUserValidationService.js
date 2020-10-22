class MockUserValidationService {
  validateCreateBody(body) {}

  validateUpdateBody(params) {}

  validatePassword(password) {}

  validateUsername(username) {}

  validatePhone(phone) {}

  validateEmail(email) {}

  validateBalance(balance) {}
}

module.exports = {
  mockUserValidationService: new MockUserValidationService(),
};
