const { ratingService } = require('../sevices/ratingService');

class RatingController {
  constructor(ratingService) {
    this.ratingService = ratingService;
  }

  async addRating(ctx, next) {
    this.ratingService.addRating(...ctx.request.body);
  }

  async removeRating(ctx, next) {}

  async getRating() {}

  async getRatingsByClientId(ctx, next) {}

  async getRatingsByCurierId(ctx, next) {}
}
