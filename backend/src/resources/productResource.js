const Product = require('../models/Product');

async function createProduct(body) {
  const product = await Product.create(body);
  return product;
}

async function getAllProducts() {
  const products = await Product.find({});
  return products;
}

async function getProductById(id, params) {
  const product = await Product.findOne({_id: id});
  return product;
}

async function updateProductById(id, params) {
  await Product.updateOne({_id: id}, {...params});
}

async function deleteProductById(id) {
  await Product.deleteOne({_id: id});
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
}