class MockCurierResource {
  constructor(curiers) {
    this.curiers = curiers;
    this.lastId = this.curiers.size;
    this.fields = [
      'username',
      'password',
      'email',
      'phone',
      'balance',
      'status',
    ];
  }

  async create(body) {
    const bodyFields = Object.keys(body);

    if (bodyFields.length < 6) {
      return { error: 'Not all requred fields' };
    }

    bodyFields.forEach((f) => {
      if (!this.fields.includes(f)) {
        return { error: 'Excess field' };
      }
    });

    this.lastId += 1;

    const curier = {
      _id: this.lastId,
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      balance: body.balance,
      status: body.status,
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

  async updateById(clientId, params) {
    Object.keys(params).forEach((p) => {
      if (!this.fields.includes(p)) {
        return { error: 'Excess field' };
      }
    });

    let curier = this.curiers.get(clientId);
    curier = { ...curier, ...params };

    this.curiers.set(clientId, curier);
  }

  async deleteById(clientId) {
    this.curiers.delete(clientId);
  }
}

module.exports = {
  mockCurierResource: new MockCurierResource(new Map()),
};
