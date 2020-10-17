const cacher = {
  users: new Map(),
  products: new Map(),
  orders: new Map(),

  test() {
    console.log(this.users);
  },

  setUser(userId, data) {
    this.users.set(userId, data);
    console.log(this.users);
  },

  hasUser(userId) {
    return this.users.has(userId);
  },

  getUser(userId) {
    return this.users.get(userId);
  },

  setProduct(productId, data) {
    this.products.set(productId, data);
  },

  hasProduct(productId) {
    return this.products.has(productId);
  },

  getProduct(productId) {
    return this.products.get(productId);
  },

  setOrder(userId, data) {
    const orders = this.orders.get(userId) || [];
    this.orders.set(userId, orders.concat(data));
  },

  hasOrder(userId) {
    return this.orders.has(userId);
  },

  getOrder(userId) {
    return this.orders.get(userId);
  },

  removeOrder(userId) {
    this.orders.delete(userId);
  },

  getAllProducts() {
    const products = [];
    for (const p of this.products.values()) {
      products.push(p);
    }
    return products;
  },
};

module.exports = cacher;
