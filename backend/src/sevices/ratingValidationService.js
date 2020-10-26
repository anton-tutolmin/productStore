const { userCheckerService } = require('./userCheckerService');
const errors = require('../errors/errors');

class RatingValidationService {
  constructor(userCheckerService) {
    this.userCheckerService = userCheckerService;
  }

  async validateCreating({ clientId, curierId, rating }) {
    await this.validateClientId(clientId);
    await this.validateCurierId(curierId);
    await this.validateRating(rating);
  }

  async validateRemoving({ clientId, curierId }) {
    await this.validateClientId(clientId);
    await this.validateCurierId(curierId);
  }

  async validateClientId(clientId) {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error(errors.notCorrectClientId);
    }

    const client = await this.userCheckerService.checkIfClientExists(clientId);

    if (!client) {
      throw new Error(errors.noSuchClient);
    }
  }

  async validateCurierId(curierId) {
    if (!curierId || typeof curierId !== 'string') {
      throw new Error(errors.notCorrectCurierId);
    }

    const curier = await this.userCheckerService.checkIfCurierExists(curierId);

    if (!curier) {
      throw new Error(errors.noSuchCurier);
    }
  }

  validateRating(rating) {
    if (!rating || typeof rating !== 'number' || (rating < 1 && rating > 5)) {
      throw new Error(errors.notCorrectRating);
    }
  }
}

module.exports = {
  RatingValidationService,
  ratingValidationService: new RatingValidationService(userCheckerService),
};
