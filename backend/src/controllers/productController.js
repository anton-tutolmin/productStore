const ProductService = require('../sevices/productService');

async function create(body) {
  const product = await ProductService.create(body);
  return product;
}

async function getAll() {
  const products = await ProductService.getAll();
  return products;
}

async function getById(id) {
  const product = await ProductService.getById(id);
  return product;
}

async function updateById(id, params) {
  const product = await ProductService.updateById(id, params);
  return product;
}

async function deleteById(id) {
  await ProductService.deleteById(id);
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
