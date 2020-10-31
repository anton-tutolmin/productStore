const { OrderMongoResource } = require('../../src/resources/orderResource');
const { mockOrderSchema } = require('../mocks/mockOrderSchema');
const { mockMongoose } = require('../mocks/mockMongoose');

const orderResource = new OrderMongoResource(mockOrderSchema, mockMongoose);

let order = {
  productId: 1,
  clientId: 1,
  curierId: 1,
  status: 'delivering',
};

describe('Test order resource', () => {
  it('create order', async () => {
    const createdOrder = await orderResource.create(order);

    expect(createdOrder._id).not.toBe(undefined);
    expect(createdOrder.productId).toBe(order.productId);
    expect(createdOrder.clientId).toBe(order.clientId);
    expect(createdOrder.curierId).toBe(order.curierId);
    expect(createdOrder.status).toBe(order.status);

    order = createdOrder;
  });

  it('get order by id', async () => {
    const returnedOrder = await orderResource.getById(order._id);

    expect(returnedOrder).toEqual(order);
  });

  it('get all orders', async () => {
    const returnedOrders = await orderResource.getAll();

    expect(returnedOrders.length).toBe(1);
    expect(returnedOrders[0]).toEqual(order);
  });

  it('get order by client id', async () => {
    const returnedOrders = await orderResource.getByClientId(order.clientId);

    expect(returnedOrders.length).toBe(1);
    expect(returnedOrders[0]).toEqual(order);
  });

  it('get order by curier id', async () => {
    const returnedOrders = await orderResource.getByCurierId(order.curierId);

    expect(returnedOrders.length).toBe(1);
    expect(returnedOrders[0]).toEqual(order);
  });

  it('get order by product id', async () => {
    const returnedOrders = await orderResource.getByProductId(order.productId);

    expect(returnedOrders.length).toBe(1);
    expect(returnedOrders[0]).toEqual(order);
  });

  it('get rquests', async () => {
    const returnedOrders = await orderResource.getRequests();

    expect(returnedOrders.length).toBe(0);
  });

  it('update order by id', async () => {
    await orderResource.updateById(order._id, { status: 'delivered' });
    const updatedOrder = await orderResource.getById(order._id);

    expect(updatedOrder.status).toBe('delivered');
  });

  it('delete order by id', async () => {
    await orderResource.deleteById(order._id);
    const deleted = await orderResource.getById(order._id);

    expect(deleted).toBe(undefined);
  });
});
