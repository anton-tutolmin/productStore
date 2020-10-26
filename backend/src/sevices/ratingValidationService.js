const { clientService } = require('./clientService');
const { curierService } = require('./curierService');
const errors = require('../errors/errors');

class RatingValidationService {
  constructor(clientService, curierService) {
    this.clientService = clientService;
    this.curierService = curierService;
  }

  async validateCreating(clientId, curierId, rating) {
    await this.validateClientId(clientId);
    await this.validateCurierId(curierId);
    await this.validateRating(rating);
  }

  async validateRemoving(clientId, curierId) {
    await this.validateClientId(clientId);
    await this.validateCurierId(curierId);
  }

  async validateClientId(clientId) {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error(errors.notCorrectClientId);
    }

    const client = await this.clientService.checkIfExist(clientId);

    if (!client) {
      throw new Error(errors.noSuchClient);
    }
  }

  async validateCurierId(curierId) {
    if (!curierId || typeof curierId !== 'string') {
      throw new Error(errors.notCorrectCurierId);
    }

    const curier = await this.curierService.checkIfExist(curierId);

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
  ratingValidationService: new RatingValidationService(
    clientService,
    curierService,
  ),
};
