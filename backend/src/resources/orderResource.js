const { Types } = require('mongoose');
const Order = require('../models/Order');
const errors = require('../errors/errors');

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
  const order = await Order.findOne({ _id: id });
  return order;
}

async function getByClientId(clientId) {
  validateId(clientId);
  const order = await Order.find({ clientId });
  return order;
}

async function getByCurierId(curierId) {
  validateId(curierId);
  const order = await Order.find({ curierId });
  return order;
}

async function getByProductId(productId) {
  validateId(productId);
  const orders = await Order.find({ productId });
  return orders;
}

async function getRequests() {
  const orders = await Order.find({
    curierId: 'none',
    status: 'created',
  });
  return orders;
}

async function updateById(id, params) {
  validateId(id);
  await Order.updateOne({ _id: id }, { ...params });
}

async function deleteById(id) {
  validateId(id);
  await Order.deleteOne({ _id: id });
}

async function deleteByClientId(clientId) {
  validateId(clientId);
  await Order.deleteMany({ clientId });
}

async function deleteByProductId(productId) {
  validateId(productId);
  await Order.deleteMany({ productId });
}

function validateId(id) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(errors.notCorrectId);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  getByClientId,
  getByCurierId,
  getByProductId,
  getRequests,
  updateById,
  deleteById,
  deleteByClientId,
  deleteByProductId,
};
