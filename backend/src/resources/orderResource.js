const Order = require('../models/Order');

async function create(body) {
  const order = await Order.create(body);
  return order;
}

async function getAll() {
  const orders = await Order.find({});
  return orders;
}

async function getById(id) {
  const order = await Order.findOne({_id: id});
  return order;
}

async function getByAuthorId(authorId) {
  const orders = await Order.find({authorId});
  return orders;
}

async function getByProductId(productId) {
  const orders = await Order.find({productId});
  return orders;
}

async function updateById(id, params) {
  await Order.updateOne({_id: id}, {...params});
}

async function deleteById(id) {
  await Order.deleteOne({_id: id});
}

async function deleteByAuthorId(authorId) {
  await Order.delete({authorId});
}

async function deleteByProductId(productId) {
  await Order.delete({productId});
}

module.exports = {
  create,
  getAll,
  getById,
  getByAuthorId,
  getByProductId, 
  updateById,
  deleteById,
  deleteByAuthorId,
  deleteByProductId
}