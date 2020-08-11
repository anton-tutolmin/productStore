const Order = require('../models/Order');

async function createOrder(body) {
  const order = await Order.create(body);
  return order;
}

async function getAllOrders() {
  const orders = await Order.find({});
  return orders;
}

async function getOrderById(id) {
  const order = await Order.findOne({_id: id});
  return order;
}

async function getOrderByAuthorId(authorId) {
  const order = await Order.findOne({authorId});
  return order;
}

async function getOrderByProductId(productId) {
  const order = await Order.findOne({productId});
  return order;
}

async function updateOrderById(id, params) {
  await Order.updateOne({_id: id}, {...params});
}

async function deleteOrderById(id) {
  await Order.deleteOne({_id: id});
}

async function deleteOrderByAuthorId(authorId) {
  await Order.deleteOne({authorId});
}

async function deleteOrderByProductId(productId) {
  await Order.deleteOne({productId});
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
  deleteOrderByProductId
}