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

  async getRatingsByClientId(clientId) {
    return await this.ratingResource.getByClientId(clientId);
  }

  async getRatingsByCurierId(curierId) {
    return await this.ratingResource.getByCurierId(curierId);
  }

  async getCurierRating(curierId) {
    const ratings = await this.ratingResource.getByCurierId(curierId);

    if (ratings.length < 1) return 0;

    return ratings.reduce((a, r) => a + r.rating, 0) / ratings.length;
  }

  async removeRating(requestBody) {
    await this.validationService.validateRemoving(requestBody);
    return await this.ratingResource.remove(requestBody);
  }
}

module.exports = {
  RatingService,
  ratingService: new RatingService(
    ratingMongoResource,
    ratingValidationService,
  ),
};
