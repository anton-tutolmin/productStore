class MockClientService {
  constructor(clients) {
    this.clients = clients;
    this.lastId = clients.size;
  }

  async create(body) {
    this.lastId += 1;

    const client = {
      _id: this.lastId,
      username: body.username,
      email: body.email,
      phone: body.phone,
      balance: 0,
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

  async deleteById(clientId) {
    this.clients.delete(clientId);
  }

  async updateById(id, body) {
    let client = this.clients.get(id);
    client = { ...client, ...body };
    this.clients.set(id, client);
  }

  async addBalance(id, coast) {
    const client = await this.clients.get(id);
    client.balance = client.balance + +coast;
  }

  async reduceBalance(id, coast) {
    const client = await this.clients.get(id);
    client.balance = client.balance - coast;
  }
}

module.exports = {
  mockClientService: new MockClientService(new Map()),
};
