const { curierService } = require('../sevices/curierService');

class CurierController {
  constructor(curierService, ratingService) {
    this.curierService = curierService;
    this.ratingService = ratingService;
  }

  async create(ctx, next) {
    const user = await this.curierService.create(ctx.request.body);
    ctx.response.body = { user };
  }

  async getAll(ctx, next) {
    const curiers = await this.curierService.getAll();
    ctx.response.body = { curiers };
  }

  async getById(ctx, next) {
    const curier = ctx.cache.getUser(ctx.params.id);
    if (curier) {
      ctx.response.body = { curier };
    } else {
      const curier = await this.curierService.getById(ctx.params.id);
      curier.rating = await this.curierService.getCurierRating(ctx.params.id);
      ctx.cache.setUser(curier.id, curier);
      ctx.response.body = { curier };
    }
  }

  async updateById(ctx, next) {
    await this.curierService.updateById(ctx.params.id, ctx.request.body);
    ctx.cache.removeUser(ctx.params.id);
    ctx.response.body = { message: 'User updated' };
  }

  async deleteById(ctx, next) {
    await this.curierService.deleteById(ctx.params.id);
    ctx.cache.removeUser(ctx.params.id);
    ctx.response.body = { message: 'User deleted' };
  }
}

module.exports = {
  CurierController,
  curierController: new CurierController(curierService),
};
