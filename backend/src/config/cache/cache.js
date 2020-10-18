class Cache {
  constructor() {
    this.orders = new Map();
    this.products = null;
  }

  setOrder(userId, orderData) {
    this.orders.set(userId, orderData);
  }

  getOrder(userId) {
    return this.orders.get(userId);
  }

  removeOrder(userId) {
    this.orders.delete(userId);
  }

  setProduct(productsData) {
    this.products = productsData;
  }

  getProduct() {
    return this.products;
  }

  removeProduct() {
    this.products = null;
  }

  addProductCount(productId) {
    const product = this.products.find((p) => p._id == productId);
    if (product) {
      product.orderedCount += 1;
    }
  }
}

module.exports = Cache;
