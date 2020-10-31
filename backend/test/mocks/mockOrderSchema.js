class MockOrderSchema {
  constructor(orders) {
    this.orders = orders;
    this.lastId = this.orders.size;
  }

  create(order) {
    this.lastId += 1;
    const createdOrder = {
      _id: this.lastId,
      ...order,
    };
    this.orders.set(createdOrder.id, createdOrder);
    return createdOrder;
  }

  find(params) {
    const orders = [];

    for (const order of this.orders.values()) {
      if (this.isCompatible(order, params)) orders.push(order);
    }

    return orders;
  }

  findOne(params) {
    for (const order of this.orders.values()) {
      if (this.isCompatible(order, params)) return order;
    }
  }

  updateOne(whereObj, params) {
    let order = this.orders.get(whereObj.id);
    order = { ...order, ...params };
    this.orders.set(whereObj.id, order);
  }

  deleteOne(whereObj) {
    this.orders.delete(whereObj.id);
  }

  deleteMany(whereObj) {
    for (const order of this.orders.values()) {
      if (this.isCompatible(order, whereObj)) this.orders.delete(order.id);
    }
  }

  isCompatible(order, params) {
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; ++i) {
      if (order[keys[i]] !== params[keys[i]]) {
        return false;
      }
    }
    return true;
  }
}

module.exports = {
  mockOrderSchema: new MockOrderSchema(new Map()),
};
