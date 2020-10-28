class MockProductResource {
  constructor(products) {
    this.products = products;
    this.lastId = this.products.size;
  }

  create(product) {
    this.lastId += 1;
    const p = { _id: this.lastId, ...product };
    this.products.set(this.lastId, p);
    return p;
  }

  getAll() {
    const products = [];
    for (const product of this.products.values()) {
      products.push(product);
    }
    return products;
  }

  getById(id) {
    return this.products.get(id);
  }

  updateById(id, params) {
    let product = this.products.get(id);
    product = { ...product, ...params };
    this.products.set(id, product);
  }

  deleteById(id) {
    this.products.delete(id);
  }
}

module.exports = {
  mockProductResource: new MockProductResource(new Map()),
};
