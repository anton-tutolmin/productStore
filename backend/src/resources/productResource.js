const Product = require('../models/Product');
const { Types } = require('mongoose');
const errors = require('../errors/errors');

async function create(body) {
  const product = await Product.create(body);
  return product;
}

async function getAll() {
  const products = await Product.find({});
  return products;
}

async function getById(id) {
  validateId(id);
  const product = await Product.findOne({ _id: id });
  return product;
}

async function updateById(id, params) {
  validateId(id);
  await Product.updateOne({ _id: id }, { ...params });
}

async function deleteById(id) {
  validateId(id);
  await Product.deleteOne({ _id: id });
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
  updateById,
  deleteById,
};
