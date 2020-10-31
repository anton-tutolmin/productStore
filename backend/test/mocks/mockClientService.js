class MockClientService {
  constructor(clients) {
    this.clients = clients;
    this.lastId = clients.size;
  }

  create(body) {
    this.lastId += 1;

    const client = {
      id: this.lastId,
      username: body.username,
      email: body.email,
      phone: body.phone,
      balance: body.balance || 0,
    };

    this.clients.set(client.id, client);
    return client;
  }

  getById(clientId) {
    return this.clients.get(clientId);
  }

  getAll() {
    const result = [];

    for (const client of this.clients.values()) {
      result.push(client);
    }

    return result;
  }

  getByUsername(username) {
    for (const client of this.clients.values()) {
      if (client.username === username) {
        return client;
      }
    }
  }

  deleteById(clientId) {
    this.clients.delete(clientId);
  }

  updateById(id, body) {
    let client = this.clients.get(id);
    client = { ...client, ...body };
    this.clients.set(id, client);
  }

  addBalance(id, coast) {
    const client = this.clients.get(id);
    client.balance = client.balance + +coast;
  }

  reduceBalance(id, coast) {
    const client = this.clients.get(id);
    client.balance = client.balance - coast;
  }
}

module.exports = {
  mockClientService: new MockClientService(new Map()),
};
