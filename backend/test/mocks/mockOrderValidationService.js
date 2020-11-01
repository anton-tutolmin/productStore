class MockOrderValidationService {
  validateUpdateBody(newStatus, oldStatus, userType) {}

  validateClientUpdate(newStatus, oldStatus) {}

  validateCurierUpdate(newStatus, oldStatus) {}
}

module.exports = {
  mockOrderValidationService: new MockOrderValidationService(),
};
