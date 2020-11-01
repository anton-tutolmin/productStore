class MockProductSchema {
  constructor(products) {
    this.products = products;
    this.lastId = this.products.size;
  }

  create(params) {
    this.lastId += 1;
    const product = { _id: this.lastId, ...params };
    this.products.set(this.lastId, product);
    return product;
  }

  find(params) {
    const products = [];

    for (const product of this.products.values()) {
      products.push(product);
    }

    return products.filter((p) => this.isCompatible(p, params));
  }

  findOne(params) {
    for (const product of this.products.values()) {
      if (this.isCompatible(product, params)) return product;
    }
  }

  updateOne(whereObj, params) {
    let product = this.products.get(whereObj._id);
    product = { ...product, ...params };
    this.products.set(whereObj._id, product);
  }

  deleteOne(whereObj) {
    this.products.delete(whereObj._id);
  }

  isCompatible(product, params) {
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; ++i) {
      if (product[keys[i]] !== params[keys[i]]) {
        return false;
      }
    }
    return true;
  }
}

module.exports = {
  mockProductSchema: new MockProductSchema(new Map()),
};
