const { orderMongoResource } = require('../resources/orderResource');
const { clientService } = require('./clientService');
const { curierService } = require('./curierService');
const { productService } = require('./productService');
const { orderValidationService } = require('./orderValidationService');
const { Order } = require('../entities/order');
const { OrderDto } = require('../dto/orderDto');

class OrderService {
  constructor(
    orderResource,
    clientService,
    curierService,
    productService,
    validationService,
  ) {
    this.orderResource = orderResource;
    this.clientService = clientService;
    this.curierService = curierService;
    this.productService = productService;
    this.validationService = validationService;
  }

  async create(requestBody, client) {
    const product = await this.productService.getById(requestBody.productId);

    await this.clientService.reduceBalance(client.id, product.coast);

    const order = new Order({ ...requestBody, clientId: client.id });

    const createdOrder = await this.orderResource.create(order);

    await this.productService.updateById(requestBody.productId, {
      orderedCount: product.orderedCount + 1,
    });

    return new OrderDto(createdOrder);
  }

  async getAll() {
    const orders = await this.orderResource.getAll();
    return orders.map((o) => new OrderDto(o));
  }

  async getById(id) {
    const order = await this.orderResource.getById(id);
    return order ? new OrderDto(order) : null;
  }

  async getByClientId(clientId) {
    const orders = await this.orderResource.getByClientId(clientId);
    return orders.map((o) => new OrderDto(o));
  }

  async getByCurierId(curierId) {
    const orders = await this.orderResource.getByCurierId(curierId);
    return orders.map((o) => new OrderDto(o));
  }

  async getByProductId(productId) {
    const orders = await this.orderResource.getByProductId(productId);
    return orders.map((o) => new OrderDto(o));
  }

  async getRequests() {
    const orders = await this.orderResource.getRequests();
    return orders.map((o) => new OrderDto(o));
  }

  async updateById(id, params, user) {
    const order = await this.orderResource.getById(id);

    this.validationService.validateUpdateBody(
      params.status,
      order.status,
      user.type,
    );

    const updates = {
      done: this.done.bind(this),
      canceled: this.cancel.bind(this),
      delivered: this.setDelivered.bind(this),
      reset: this.reset.bind(this),
    };

    await updates[params.status](order, user);
  }

  async deleteById(id) {
    await this.orderResource.deleteById(id);
  }

  async deleteByClientId(clientId) {
    await this.orderResource.deleteByClientId(clientId);
  }

  async deleteByProductId(productId) {
    await this.orderResource.deleteByProductId(productId);
  }

  // Client admit order delivered
  // Need to set order status on "done"
  // and add balance to curier(5% order coast)
  async done(order) {
    const coast = await this.getCoast(order.productId);
    const payoff = Number.parseFloat(coast * 0.05).toFixed(2);
    await this.curierService.addBalance(order.curierId, payoff);
    await this.orderResource.updateById(order._id, { status: 'done' });
  }

  // Curier cancel order delivery
  // Need set order status on "created"
  async reset(order) {
    await this.orderResource.updateById(order._id, {
      curierId: 'none',
      status: 'created',
    });
  }

  // Client cancel his own order
  // Need return money to client
  async cancel(order) {
    const coast = await this.getCoast(order.productId);
    await this.clientService.addBalance(order.clientId, coast);
    await this.orderResource.updateById(order._id, { status: 'canceled' });
  }

  async setDelivered(order) {
    await this.orderResource.updateById(order._id, { status: 'delivered' });
  }

  async getCoast(productId) {
    const product = await this.productService.getById(productId);
    return product.coast;
  }

  async setCandidate({ orderId, curierId }) {
    return await this.orderResource.setCandidate(orderId, curierId);
  }

  async getCandidatesByOrderId(orderId) {
    const candidates = await this.orderResource.getCandidatesByOrderId(orderId);
    const curiers = [];

    for (const candidate of candidates) {
      const curier = await this.curierService.getById(candidate.curierId);
      curiers.push(curier);
    }

    return curiers;
  }

  async electCandidate({ orderId, curierId }) {
    await this.orderResource.deleteCandidateByOrderId(orderId);
    await this.orderResource.updateById(orderId, {
      curierId,
      status: 'delivering',
    });
  }
}

module.exports = {
  OrderService,
  orderService: new OrderService(
    orderMongoResource,
    clientService,
    curierService,
    productService,
    orderValidationService,
  ),
};
