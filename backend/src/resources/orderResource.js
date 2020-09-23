const {Types} = require('mongoose');
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
  validateId(id);
  const order = await Order.findOne({_id: id});
  return order;
}

async function getByClientId(clientId) {
  validateId(clientId);
  const order = await Order.find({clientId});
  return order;
}

async function getByCurierId(curierId) {
  validateId(curierId);
  const order = await Order.find({curierId});
  return order;
}

async function getByProductId(productId) {
  validateId(productId);
  const orders = await Order.find({productId});
  return orders;
}

async function updateById(id, params) {
  validateId(id);
  await Order.updateOne({_id: id}, {...params});
}

async function deleteById(id) {
  validateId(id);
  await Order.deleteOne({_id: id});
}

async function deleteByClientId(clientId) {
  validateId(id);
  await Order.deleteMany({clientId})
}

async function deleteByProductId(productId) {
  validateId(id);
  await Order.deleteMany({productId});
}

function validateId(id) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Not valid id');
  }
}

module.exports = {
  create,
  getAll,
  getById,
  getByClientId,
  getByCurierId,
  getByProductId, 
  updateById,
  deleteById,
  deleteByClientId,
  deleteByProductId
}