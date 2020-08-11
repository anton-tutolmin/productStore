const OrderResource = require('../resources/orderResource');

async function createOrder(body) {
  const order = await OrderResource.createOrder(body);
  return order;
}

async function getAllOrders() {
  const orders = await OrderResource.getAllOrders();
  return orders;
}

async function getOrderById(id) {
  const order = await OrderResource.getOrderById(id);
  return order;
}

async function getOrderByAuthorId(authorId) {
  const order = await OrderResource.getOrderByAuthorId(authorId);
  return order;
}

async function getOrderByProductId(productId) {
  const order = await OrderResource.getOrderByProductId(productId);
  return order;
}

async function updateOrderById(id, params) {
  await OrderResource.updateOrderById(id, params);
  const order = OrderResource.getOrderById(id);
  return order;
}

async function deleteOrderById(id) {
  await OrderResource.deleteOrderById(id);
}

async function deleteOrderByAuthorId(authorId) {
  await OrderResource.deleteOrderByAuthorId(authorId);
}

async function deleteOrderByProductId(productId) {
  await OrderResource.deleteOrderByAuthorId(productId);
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByAuthorId,
  getOrderByProductId,
  updateOrderById,
  deleteOrderById,
  deleteOrderByAuthorId,
  deleteOrderByProductId,
}