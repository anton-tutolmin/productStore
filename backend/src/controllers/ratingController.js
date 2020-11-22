const { ratingService } = require('../sevices/ratingService');
const { ratingCheckerService } = require('../sevices/ratingCheckerService');

class RatingController {
  constructor(ratingService, ratingCheckerService) {
    this.ratingService = ratingService;
    this.ratingCheckerService = ratingCheckerService;
  }

  async addRating(ctx, next) {
    const clientId = ctx.state.user.id;
    await this.ratingService.addRating({ clientId, ...ctx.request.body });
    ctx.response.body = { message: 'Rating is added' };
  }

  async removeRating(ctx, next) {
    await this.ratingService.removeRating(ctx.request.body);
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
  ratingController: new RatingController(ratingService, ratingCheckerService),
};
