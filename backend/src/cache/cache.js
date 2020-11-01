class Cache {
  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.products = null;
  }

  setOrder(orderId, orderData) {
    this.orders.set(orderId, orderData);
  }

  getOrder(orderId) {
    return this.orders.get(orderId);
  }

  removeOrder(orderId) {
    this.orders.delete(orderId);
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

  setUser(userId, userData) {
    this.users.set(userId, userData);
  }

  getUser(userId) {
    return this.users.get(userId);
  }

  updateUser(userId, updateData) {
    let user = this.users.get(userId);
    user = { ...user, updateData };
    this.users.set(userId, user);
  }

  removeUser(userId) {
    this.users.delete(userId);
  }
}

module.exports = Cache;
