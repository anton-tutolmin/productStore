class MockOrderService {
  constructor(orders) {
    this.orders = orders;
    this.lastId = this.orders.size;
  }

  create(requestBody) {
    this.lastId += 1;
    const order = {
      id: this.lastId,
      ...requestBody,
    };
    this.orders.set(order.id, order);
    return order;
  }

  getById(orderId) {
    return this.orders.get(orderId);
  }

  getAll() {
    const result = [];
    for (const order of this.orders.values()) {
      result.push(order);
    }
    return result;
  }

  getByClientId(clientId) {
    const result = [];
    for (const order of this.orders.values()) {
      if (order.clientId === clientId) result.push(order);
    }
    return result;
  }

  getByCurierId(curierId) {
    const result = [];
    for (const order of this.orders.values()) {
      if (order.curierId === curierId) result.push(order);
    }
    return result;
  }

  getRequests() {
    const result = [];
    for (const order of this.orders.values()) {
      if (order.curierId === 'none' && order.status === 'created') {
        result.push(order);
      }
    }
    return result;
  }

  updateById(orderId, params) {
    let order = this.orders.get(orderId);
    order = { ...order, ...params };
    this.orders.set(orderId, order);
  }

  deleteById(orderId) {
    this.orders.delete(orderId);
  }

  deleteByClientId(clientId) {
    for (const order of this.orders.values()) {
      if (order.clientId === clientId) {
        this.orders.delete(order.id);
        return;
      }
    }
  }

  deleteByProductId(productId) {
    for (const order of this.orders.values()) {
      if (order.productId === productId) {
        this.orders.delete(order.id);
        return;
      }
    }
  }
}

module.exports = {
  mockOrderService: new MockOrderService(new Map()),
};
