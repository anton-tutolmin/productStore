class OrderDto {
  constructor({ _id, clientId, productId, curierId, status }) {
    this.id = _id;
    this.clientId = clientId;
    this.productId = productId;
    this.curierId = curierId;
    this.status = status;
  }
}

module.exports = {
  OrderDto,
};
