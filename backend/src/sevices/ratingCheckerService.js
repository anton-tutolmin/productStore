const { ratingMongoResource } = require('../resources/ratingResource');

class RatingCheckerService {
  constructor(ratingResource) {
    this.ratingResource = ratingResource;
  }

  async checkIfExist({ clientId, curierId }) {
    return await this.ratingResource.isExist({ clientId, curierId });
  }
}

module.exports = {
  RatingCheckerService,
  ratingCheckerService: new RatingCheckerService(ratingMongoResource),
};
