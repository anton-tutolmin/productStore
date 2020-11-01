class MockOrderResource {
  constructor(orders) {
    this.orders = orders;
    this.lastId = orders.size;
  }

  async create(requestBody) {
    this.lastId += 1;
    const order = {
      _id: this.lastId,
      ...requestBody,
    };

    this.orders.set(order._id, order);

    return order;
  }

  async getAll() {
    const orders = [];
    for (const order of this.orders.values()) {
      orders.push(order);
    }
    return orders;
  }

  async getById(id) {
    return this.orders.get(id);
  }

  async getByClientId(clientId) {
    const orders = [];
    for (const order of this.orders.values()) {
      if (order.clientId === clientId) orders.push(order);
    }
    return orders;
  }

  async getByCurierId(curierId) {
    const orders = [];
    for (const order of this.orders.values()) {
      if (order.curierId === curierId) orders.push(order);
    }
    return orders;
  }

  async getByProductId(productId) {
    const orders = [];
    for (const order of this.orders.values()) {
      if (order.productId === productId) orders.push(order);
    }
    return orders;
  }

  async getRequests() {
    const requests = [];
    for (const order of this.orders.values()) {
      if (order.curierId === 'none' && order.status === 'created') {
        requests.push(order);
      }
    }
    return requests;
  }

  async updateById(id, params) {
    let order = this.orders.get(id);
    order = { ...order, ...params };
    this.orders.set(id, order);
  }

  async deleteById(id) {
    this.orders.delete(id);
  }

  async deleteByClientId(clientId) {
    for (const order of this.orders.values()) {
      if (order.clientId === clientId) {
        this.orders.delete(order.id);
        return;
      }
    }
  }

  async deleteByProductId(productId) {
    for (const order of this.orders.values()) {
      if (order.productId === productId) {
        this.orders.delete(order.id);
        return;
      }
    }
  }
}

module.exports = {
  mockOrderResource: new MockOrderResource(new Map()),
};
