class MockCurierService {
  constructor(curiers) {
    this.curiers = curiers;
    this.lastId = this.curiers.size;
  }

  create(body) {
    this.lastId += 1;
    const curier = {
      id: this.lastId,
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      status: 'open',
      balance: body.balance || 0,
    };

    this.curiers.set(curier.id, curier);
    return curier;
  }

  getById(curierId) {
    return this.curiers.get(curierId);
  }

  getAll() {
    const result = [];

    for (const curier of this.curiers.values()) {
      result.push(curier);
    }

    return result;
  }

  getByUsername(username) {
    for (const curier of this.curiers.values()) {
      if (curier.username === username) {
        return curier;
      }
    }
  }

  deleteById(curierId) {
    this.curiers.delete(curierId);
  }

  updateById(id, body) {
    let curier = this.curiers.get(id);
    curier = { ...curier, ...body };
    this.curiers.set(id, curier);
  }

  addBalance(id, coast) {
    const curier = this.curiers.get(id);
    curier.balance = curier.balance + +coast;
  }
}

module.exports = {
  mockCurierService: new MockCurierService(new Map()),
};
