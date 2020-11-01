class MockClientResource {
  constructor(clients) {
    this.clients = clients;
    this.lastId = this.clients.size;
    this.fields = ['username', 'password', 'email', 'phone', 'balance'];
  }

  async create(body) {
    const bodyFields = Object.keys(body);

    if (bodyFields.length !== 5) {
      return { error: 'Not all requred fields' };
    }

    bodyFields.forEach((f) => {
      if (!this.fields.includes(f)) {
        return { error: 'Excess field' };
      }
    });

    this.lastId += 1;

    const client = {
      _id: this.lastId,
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      balance: body.balance,
    };

    this.clients.set(client._id, client);
    return client;
  }

  async getById(clientId) {
    return this.clients.get(clientId);
  }

  async getAll() {
    const result = [];

    for (const client of this.clients.values()) {
      result.push(client);
    }

    return result;
  }

  async getByUsername(username) {
    for (const client of this.clients.values()) {
      if (client.username === username) {
        return client;
      }
    }
  }

  async updateById(clientId, params) {
    Object.keys(params).forEach((p) => {
      if (!this.fields.includes(p)) {
        return { error: 'Excess field' };
      }
    });

    let client = this.clients.get(clientId);
    client = { ...client, ...params };

    this.clients.set(clientId, client);
  }

  async deleteById(clientId) {
    this.clients.delete(clientId);
  }
}

module.exports = {
  mockClientResource: new MockClientResource(new Map()),
};
