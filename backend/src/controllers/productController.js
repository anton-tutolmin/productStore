const ProductService = require('../sevices/productService');

async function createProduct(body) {
  const product = await ProductService.createProduct(body);
  return product;
}

async function getAllProducts() {
  const products = await ProductService.getAllProducts();
  return products;
}

async function getProductById(id) {
  const product = await ProductService.getProductById(id);
  return product;
}

async function updateProductById(id, params) {
  const product = await ProductService.updateProductById(id, params);
  return product;
}

async function deleteProductById(id) {
  await ProductService.deleteProductById(id);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
}