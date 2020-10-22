class MockCurierService {
  constructor(curiers) {
    this.curiers = curiers;
    this.lastId = this.curiers.size;
  }

  async create(body) {
    this.lastId += 1;
    const curier = {
      _id: this.lastId,
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      status: 'open',
      balance: 0,
    };

    this.curiers.set(curier._id, curier);
    return curier;
  }

  async getById(curierId) {
    return this.curiers.get(curierId);
  }

  async getAll() {
    const result = [];

    for (const curier of this.curiers.values()) {
      result.push(curier);
    }

    return result;
  }

  async getByUsername(username) {
    for (const curier of this.curiers.values()) {
      if (curier.username === username) {
        return curier;
      }
    }
  }

  async deleteById(curierId) {
    this.curiers.delete(curierId);
  }

  async updateById(id, body) {
    let curier = this.curiers.get(id);
    curier = { ...curier, ...body };
    this.curiers.set(id, curier);
  }
}

module.exports = {
  mockCurierService: new MockCurierService(new Map()),
};
