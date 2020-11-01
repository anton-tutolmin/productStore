class Order {
  constructor({ productId, clientId, curierId, status }) {
    this.productId = productId;
    this.clientId = clientId;
    this.curierId = curierId || 'none';
    this.status = status || 'created';
  }
}

module.exports = {
  Order,
};
