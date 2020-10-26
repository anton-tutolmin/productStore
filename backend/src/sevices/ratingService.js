const { ratingMongoResource } = require('../resources/ratingResource');
const { ratingValidationService } = require('./ratingValidationService');
const { Rating } = require('../entities/rating');

class RatingService {
  constructor(ratingResource, validationService) {
    this.ratingResource = ratingResource;
    this.validationService = validationService;
  }

  async addRating(requestBody) {
    const rating = new Rating(requestBody);
    await this.validationService.validateCreating(rating);
    return await this.ratingResource.add(rating);
  }

  async removeRating(requestBody) {
    await this.validationService.validateRemoving(requestBody);
    return await this.ratingResource.remove(requestBody);
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
