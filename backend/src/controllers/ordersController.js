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

async function updateById(id, params) {
  const order = await OrderService.updateById(id, params);
  return order
}

async function deleteById(id) {
  await OrderService.deleteById(id);
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
}