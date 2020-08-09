const ProductService = require('../sevices/productService');

async function createProduct(product) {
  const product = await ProductService.createProduct();
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
  const product = await ProductService.updateProductById(id, params)
}

async function deleteProductsById(id) {

}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductsById
}