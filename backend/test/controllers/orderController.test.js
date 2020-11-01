const { OrderController } = require('../../src/controllers/orderController');
const { mockOrderService } = require('../mocks/mockOrderService');

const orderController = new OrderController(mockOrderService);

let order = {
  productId: 1,
  clientId: 1,
  curierId: 1,
  status: 'delivering',
};

describe('Test order controller', () => {
  it('create order', async () => {
    const ctx = {
      request: { body: order },
      response: {},
      state: { user: { id: 1 } },
    };

    await orderController.create(ctx, () => {});

    expect(ctx.response.body.order.id).not.toBe(undefined);
    expect(ctx.response.body.order.clientId).toBe(1);
    expect(ctx.response.body.order.curierId).toBe(1);
    expect(ctx.response.body.order.productId).toBe(1);

    order = ctx.response.body.order;
  });

  it('get order by id', async () => {
    const ctx = {
      params: { id: order.id },
      requests: {},
      response: {},
    };

    await orderController.getById(ctx, () => {});

    expect(ctx.response.body.order).toEqual(order);
  });

  it('get all orders', async () => {
    const ctx = {
      request: {},
      response: {},
    };

    await orderController.getAll(ctx, () => {});

    expect(ctx.response.body.orders.length).toBe(1);
    expect(ctx.response.body.orders[0]).toEqual(order);
  });

  it('get order by client id', async () => {
    const ctx = {
      params: { id: order.clientId },
      request: {},
      response: {},
      state: { user: { type: 'client' } },
    };

    await orderController.getByUserId(ctx, () => {});

    expect(ctx.response.body.orders.length).toBe(1);
    expect(ctx.response.body.orders[0]).toEqual(order);
  });

  it('get order by curier id', async () => {
    const ctx = {
      params: { id: order.curierId },
      request: {},
      response: {},
      state: { user: { type: 'curier' } },
    };

    await orderController.getByUserId(ctx, () => {});

    expect(ctx.response.body.orders.length).toBe(1);
    expect(ctx.response.body.orders[0]).toEqual(order);
  });

  it('get requests', async () => {
    const ctx = {
      request: {},
      response: {},
    };

    await orderController.getRequests(ctx, () => {});

    expect(ctx.response.body.orders.length).toBe(0);
  });

  it('update order by id', async () => {
    const ctx = {
      params: { id: order.id },
      request: { body: { status: 'delivered' } },
      response: {},
      state: { user: { type: 'curier' } },
    };

    await orderController.updateById(ctx, () => {});

    expect(ctx.response.body.message).toBe('Order updated');

    await orderController.getById(ctx, () => {});

    expect(ctx.response.body.order.status).toBe('delivered');
  });

  it('delete order by id', async () => {
    const ctx = {
      params: { id: order.id },
      request: {},
      response: {},
    };

    await orderController.deleteById(ctx, () => {});

    expect(ctx.response.body.message).toBe('Order deleted');

    await orderController.getById(ctx, () => {});

    expect(ctx.response.body.order).toBe(undefined);
  });
});
