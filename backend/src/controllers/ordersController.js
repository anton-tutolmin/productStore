const OrderService = require('../sevices/orderService');

async function createOrder(body) {
  const order = await OrderService.createOrder(body);
  return order;
}

async function getAllOrders() {
  const orders = await OrderService.getAllOrders();
  return orders;
}

async function getOrderById(id) {
  const order = await OrderService.getOrderById(id);
  return order;
}

async function updateOrderById(id, params) {
  const order = await OrderService.updateOrderById(id, params);
  return order
}

async function deleteOrderById(id) {
  await OrderService.deleteOrderById(id);
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
}