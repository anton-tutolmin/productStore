class MockRatingValidationService {
  async validateCreating({ clientId, curierId, rating }) {}

  async validateRemoving({ clientId, curierId }) {}

  async validateClientId(clientId) {}

  async validateCurierId(curierId) {}

  validateRating(rating) {}
}

module.exports = {
  mockRatingValidationService: new MockRatingValidationService(),
};
