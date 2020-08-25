const OrderService = require('../sevices/orderService');

async function create(body) {
  const order = await OrderService.create(body);
  return order;
}

async function getAll() {
  const orders = await OrderService.getAll();
  return orders;
}

async function getById(id) {
  const order = await OrderService.getById(id);
  return order;
}

async function updateById(id, params, user) {
  await OrderService.updateById(id, params, user);
}

async function deleteById(id) {
  await OrderService.deleteById(id);
}

async function deleteByClientId(clientId) {
  await OrderService.deleteByClientId(clientId);
}

async function deleteByProductId(productId) {
  await OrderService.deleteByProductId(productId);
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  deleteByClientId,
  deleteByProductId
}