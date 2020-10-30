const { orderService } = require('../sevices/orderService');

class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async create(ctx, next) {
    const order = await this.orderService.create(
      ctx.request.body,
      ctx.state.user,
    );

    ctx.response.body = { order };
  }

  async getAll(ctx, next) {
    const orders = await this.orderService.getAll();
    ctx.response.body = { orders };
  }

  async getById(ctx, next) {
    const order = await this.orderService.getById(ctx.params.id);
    ctx.response.body = { order };
  }

  async getByClientId(ctx, next) {
    const orders = await this.orderService.getByClientId(ctx.params.id);
    ctx.response.body = { orders };
  }

  async getByCurierId(ctx, next) {
    const orders = await this.orderService.getByCurierId(ctx.params.id);
    ctx.response.body = { orders };
  }

  async getRequests(ctx, next) {
    const orders = await this.orderService.getRequests();
    ctx.response.body = { orders };
  }

  async updateById(ctx, next) {
    await this.orderService.updateById(ctx.params.id, ctx.request.body);
    ctx.response.body = { message: 'Order updated' };
  }

  async deleteById(ctx, next) {
    await this.orderService.deleteById(ctx.params.id);
    ctx.response.body = { message: 'Order deleted' };
  }

  async deleteByClientId(ctx, next) {
    await this.orderService.deleteByClientId(ctx.params.id);
  }

  async deleteByProductId(ctx, next) {
    await this.orderService.deleteByProductId(ctx.params.id);
  }
}

module.exports = {
  OrderController,
  orderController: new OrderController(orderService),
};
