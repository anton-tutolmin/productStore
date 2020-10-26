const { ratingMongoResource } = require('../resources/ratingResource');
const { ratingValidationService } = require('./ratingValidationService');

class RatingService {
  constructor(ratingResource, validationService) {
    this.ratingResource = ratingResource;
    this.validationService = validationService;
  }

  async addRating(clientId, curierId, rating) {
    await this.validationService.validateCreating(clientId, curierId, rating);
    return await this.ratingResource.add(clientId, curierId, rating);
  }

  async removeRating(clientId, curierId) {
    await this.validationService.validateRemoving(clientId, curierId);
    return await this.ratingResource.remove(clientId, curierId);
  }

  async getRatingsByClientId(clientId) {
    return await this.ratingResource.getRatingsByClientId(clientId);
  }

  async getRatingsByCurierId(curierId) {
    return await this.ratingResource.getRatingsByCurierId(curierId);
  }

  async getCurierRating(curierId) {
    const ratings = await this.ratingResource.getRatingsByCurierId(curierId);

    if (ratings.length < 1) return 0;

    return ratings.reduce((a, c) => a + c, 0) / ratings.length;
  }
}

module.exports = {
  ratingService: new RatingService(
    ratingMongoResource,
    ratingValidationService,
  ),
};
