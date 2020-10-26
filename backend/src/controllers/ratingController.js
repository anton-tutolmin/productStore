const { ratingService } = require('../sevices/ratingService');

class RatingController {
  constructor(ratingService) {
    this.ratingService = ratingService;
  }

  async addRating(ctx, next) {
    await this.ratingService.addRating(...ctx.request.body);
    ctx.response.body = { message: 'Rating is added' };
  }

  async removeRating(ctx, next) {
    await this.ratingService.removeRating(...ctx.request.body);
    ctx.response.body = { message: 'Rating is removed' };
  }

  async getCurierRating(ctx, next) {
    const rating = await this.ratingService.getCurierRating(ctx.params.id);
    ctx.response.body = { rating };
  }

  async getRatingsByClientId(ctx, next) {
    const ratings = await this.ratingService.getRatingsByClientId(
      ctx.params.id,
    );
    ctx.response.body = { ratings };
  }

  async getRatingsByCurierId(ctx, next) {
    const ratings = await this.ratingService.getRatingsByCurierId(
      ctx.params.id,
    );
    ctx.response.body = { ratings };
  }
}

module.exports = {
  RatingController,
  ratingController: new RatingController(ratingService),
};
