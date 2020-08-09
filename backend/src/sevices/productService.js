const ProductResource = require('../resources/productResource');

async function createProduct(body) {
  const product = await ProductResource.createProduct(body);
  return product;
}

async function getAllProducts() {
  const products = await ProductResource.getAllProducts();
  return products;
}

async function getProductById(id) {
  const product = await ProductResource.getProductById(id);
  return product;
}

async function updateProductById(id, params) {
  await ProductResource.updateProductById(id, params);
  const product = await ProductResource.getProductById(id);
  return product;
}

async function deleteProductById(id) {
  await ProductResource.deleteProductById(id);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
};