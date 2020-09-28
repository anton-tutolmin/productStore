const ProductResource = require('../resources/productResource');
const validator = require('./validatorService/product');

async function create(body) {
  validator.validateCreateBody(body);
  const product = await ProductResource.create(body);
  return product;
}

async function getAll() {
  const products = await ProductResource.getAll();
  return products;
}

async function getById(id) {
  const product = await ProductResource.getById(id);
  return product;
}

async function updateById(id, params) {
  validator.validateUpdateBody(params);
  await ProductResource.updateById(id, params);
  const product = await ProductResource.getById(id);
  return product;
}

async function deleteById(id) {
  await ProductResource.deleteById(id);
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
