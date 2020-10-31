const { OrderService } = require('../../src/sevices/orderService');
const { mockOrderResource } = require('../mocks/mockOrderResource');
const { mockClientService } = require('../mocks/mockClientService');
const { mockCurierService } = require('../mocks/mockCurierService');
const { mockProductService } = require('../mocks/mockProductService');
const {
  mockOrderValidationService,
} = require('../mocks/mockOrderValidationService');

const orderService = new OrderService(
  mockOrderResource,
  mockClientService,
  mockCurierService,
  mockProductService,
  mockOrderValidationService,
);

let order;

let client = {
  username: 'client',
  password: 'client',
  email: 'client',
  phone: 'client',
  balance: 100,
};

let curier = {
  username: 'curier',
  password: 'curier',
  email: 'curier',
  phone: 'curier',
  balance: 100,
};

let product = {
  productname: 'product',
  description: 'product',
  img: 'product',
  coast: 10,
  orderedCount: 0,
};

describe('Test order service', () => {
  beforeAll(() => {
    const createdClient = mockClientService.create(client);
    const createdCurier = mockCurierService.create(curier);
    const createdProduct = mockProductService.create(product);

    client = createdClient;
    curier = createdCurier;
    product = createdProduct;
  });

  it('create order', async () => {
    const createdOrder = await orderService.create(
      { productId: product.id },
      client,
    );

    expect(createdOrder.id).not.toBe(undefined);
    expect(createdOrder.clientId).toBe(client.id);
    expect(createdOrder.curierId).toBe('none');
    expect(createdOrder.productId).toBe(product.id);

    const updatedClient = mockClientService.getById(client.id);

    expect(updatedClient.balance).toBe(90);

    const updatedProduct = mockProductService.getById(product.id);

    expect(updatedProduct.orderedCount).toBe(1);

    order = createdOrder;
  });

  it('get order by id', async () => {
    const returnedOrder = await orderService.getById(order.id);

    expect(returnedOrder).toEqual(order);
  });

  it('get order by client id', async () => {
    const returnedOrders = await orderService.getByClientId(client.id);

    expect(returnedOrders.length).toBe(1);
    expect(returnedOrders[0]).toEqual(order);
  });

  it('get order by product id', async () => {
    const returnedOrders = await orderService.getByProductId(product.id);

    expect(returnedOrders.length).toBe(1);
    expect(returnedOrders[0]).toEqual(order);
  });

  it('get request', async () => {
    const requests = await orderService.getRequests();

    expect(requests.length).toBe(1);
    expect(requests[0].curierId).toBe('none');
    expect(requests[0].status).toBe('created');
  });

  it('update order by id', async () => {
    await orderService.updateById(order.id, { status: 'delivering' }, curier);
    const updatedOrder1 = await orderService.getById(order.id);
    expect(updatedOrder1.status).toBe('delivering');
    expect(updatedOrder1.curierId).toBe(curier.id);

    await orderService.updateById(order.id, { status: 'delivered' }, curier);
    const updatedOrder2 = await orderService.getById(order.id);
    expect(updatedOrder2.status).toBe('delivered');

    await orderService.updateById(order.id, { status: 'done' }, client);
    const updatedOrder3 = await orderService.getById(order.id);
    expect(updatedOrder3.status).toBe('done');
    expect(curier.balance).toBe(100.5);

    await orderService.updateById(order.id, { status: 'reset' }, client);
    const updatedOrder4 = await orderService.getById(order.id);
    expect(updatedOrder4.status).toBe('created');
    expect(updatedOrder4.curierId).toBe('none');

    await orderService.updateById(order.id, { status: 'canceled' }, client);
    const updatedOrder5 = await orderService.getById(order.id);
    expect(updatedOrder5.status).toBe('canceled');

    await orderService.updateById(order.id, { status: 'delivering' }, curier);
  });

  it('get order by curier id', async () => {
    const orders = await orderService.getByCurierId(curier.id);
    expect(orders.length).toBe(1);
    expect(orders[0].curierId).toBe(curier.id);
  });

  it('delete order by id', async () => {
    await orderService.deleteById(order.id);
    const deleted = await orderService.getById(order.id);

    expect(deleted).toBe(null);
  });
});
