class MockProductService {
  constructor(products) {
    this.products = products;
    this.lastId = products.size;
  }

  create(requestBody) {
    this.lastId += 1;
    const product = { id: this.lastId, ...requestBody };
    this.products.set(this.lastId, product);
    return product;
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
  mockProductService: new MockProductService(new Map()),
};
