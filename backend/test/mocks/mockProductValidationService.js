class MockProdcutValidationService {
  validateCreateBody() {}

  validateUpdateBody() {}
}

module.exports = {
  mockProdcutValidationService: new MockProdcutValidationService(),
};
