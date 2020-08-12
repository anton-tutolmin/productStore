const Product = require('../models/Product');

async function create(body) {
  const product = await Product.create(body);
  return product;
}

async function getAll() {
  const products = await Product.find({});
  return products;
}

async function getById(id, params) {
  const product = await Product.findOne({_id: id});
  return product;
}

async function updateById(id, params) {
  await Product.updateOne({_id: id}, {...params});
}

async function deleteById(id) {
  await Product.deleteOne({_id: id});
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
}