const { orderService } = require('../sevices/orderService');

class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async create(ctx, next) {
    if (ctx.state.user.type !== 'client') {
      throw new Error('Order product can only client');
    }

    const order = await this.orderService.create(
      ctx.request.body,
      ctx.state.user,
    );

    ctx.response.body = { order, message: 'Order created' };
  }

  async getAll(ctx, next) {
    const orders = await this.orderService.getAll();
    ctx.response.body = { orders };
  }

  async getById(ctx, next) {
    const order = await this.orderService.getById(ctx.params.id);
    ctx.response.body = { order };
  }

  async getByUserId(ctx, next) {
    const getMethods = {
      client: this.getByClientId.bind(this),
      curier: this.getByCurierId.bind(this),
    };

    const orders = await getMethods[ctx.state.user.type](ctx.params.id);
    ctx.response.body = { orders };
  }

  async getByClientId(clientId) {
    return await this.orderService.getByClientId(clientId);
  }

  async getByCurierId(curierId) {
    return await this.orderService.getByCurierId(curierId);
  }

  async getRequests(ctx, next) {
    const orders = await this.orderService.getRequests();
    ctx.response.body = { orders };
  }

  async updateById(ctx, next) {
    await this.orderService.updateById(
      ctx.params.id,
      ctx.request.body,
      ctx.state.user,
    );
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
