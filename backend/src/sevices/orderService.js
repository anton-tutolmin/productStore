const OrderResource = require('../resources/orderResource');
const UserService = require('./userService');
const ProductService = require('./productService');
const validator = require('./validatorService/order');
const errors = require('../errors/errors');

async function create(body, user) {
  const product = await ProductService.getById(body.productId);
  if (!product) throw new Error('No such product');

  if (!user) throw new Error('No such user');

  if (user.type === 2) throw new Error('Curier cant create order');

  if (user.balance < product.coast)
    throw new Error('Not enough money');

  await UserService.reduceBalance(user._id, product.coast);

  const createBody = {
    status: 'created',
    clientId: user._id,
    curierId: 'none',
    productId: body.productId,
  };

  const order = await OrderResource.create(createBody);

  await ProductService.updateById(body.productId, {
    orderedCount: product.orderedCount + 1,
  });

  return order;
}

async function getAll() {
  const orders = await OrderResource.getAll();
  return orders;
}

async function getById(id) {
  const order = await OrderResource.getById(id);
  return order;
}

async function getByUserId(userId) {
  const user = await UserService.getById(userId);

  if (user.type === 1) {
    return await getByClientId(userId);
  } else {
    return await getByCurierId(userId);
  }
}

async function getByClientId(clientId) {
  const order = await OrderResource.getByClientId(clientId);
  return order;
}

async function getByCurierId(curierId) {
  const order = OrderResource.getByCurierId(curierId);
  return order;
}

async function getByProductId(productId) {
  const orders = await OrderResource.getByProductId(productId);
  return orders;
}

async function getRequests() {
  const orders = await OrderResource.getRequests();
  return orders;
}

async function updateById(id, params, user) {
  const order = await OrderResource.getById(id);

  isAllowed(order, user);

  validator.validateUpdateBody(
    params.status,
    order.status,
    user.type,
  );

  const updates = {
    done: done,
    canceled: cancel,
    delivering: takeDelivery,
    delivered: setDelivered,
    reset: reset,
  };

  await updates[params.status](order, user);
}

async function deleteById(id) {
  await OrderResource.deleteById(id);
}

async function deleteByClientId(clientId) {
  await OrderResource.deleteByClientId(clientId);
}

async function deleteByProductId(productId) {
  await OrderResource.deleteByProductId(productId);
}

// Client admit order delivered
// Need to set order status on "done"
// and add balance to curier(5% order coast)
async function done(order) {
  const coast = await getCoast(order);
  const payoff = Number.parseFloat(coast * 0.05).toFixed(2);
  await UserService.addBalance(order.curierId, payoff);
  await OrderResource.updateById(order._id, { status: 'done' });
}

// Curier cancel order delivery
// Need set order status on "created"
async function reset(order) {
  await OrderResource.updateById(order._id, {
    curierId: 'none',
    status: 'created',
  });
}

// Client cancel his own order
// Need return money to client
async function cancel(order) {
  const coast = await getCoast(order);
  await UserService.addBalance(order.clientId, coast);
  await OrderResource.updateById(order._id, { status: 'canceled' });
}

async function takeDelivery(order, user) {
  await OrderResource.updateById(order._id, {
    curierId: user._id,
    status: 'delivering',
  });
}

async function setDelivered(order) {
  await OrderResource.updateById(order._id, { status: 'delivered' });
}

async function getCoast(order) {
  const product = await ProductService.getById(order.productId);
  return product.coast;
}

// If user not client, curier or admin not allow update order
function isAllowed(order, user) {
  if (
    order.clientId !== user._id.toString() &&
    order.curierId !== user._id.toString() &&
    order.curierId !== 'none' &&
    user.type !== 3
  ) {
    throw new Error(errors.notAllowedInterrupt);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  getByUserId,
  getByProductId,
  getRequests,
  updateById,
  deleteById,
  deleteByClientId,
  deleteByProductId,
};
