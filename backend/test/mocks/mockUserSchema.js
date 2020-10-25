class MockUserSchema {
  constructor(clients) {
    this.clients = clients;
    this.lastId = clients.size;
  }

  create(body) {
    this.lastId += 1;
    const client = { ...body, _id: this.lastId };
    this.clients.set(this.lastId, client);
    return client;
  }

  find(params) {
    let clients = [];

    for (const clinet of this.clients.values()) {
      clients.push(clinet);
    }

    clients = clients.filter((c) => this.isCompatible(c, params));

    return clients;
  }

  findOne(params) {
    for (const client of this.clients.values()) {
      if (this.isCompatible(client, params)) return client;
    }
  }

  isCompatible(client, params) {
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; ++i) {
      if (client[keys[i]] !== params[keys[i]]) {
        return false;
      }
    }
    return true;
  }

  updateOne(whereObj, params) {
    let client = this.clients.get(whereObj._id);
    client = { ...client, ...params };
    this.clients.set(whereObj._id, client);
  }

  deleteOne(whereObj) {
    this.clients.delete(whereObj._id);
  }
}

module.exports = {
  mockUserSchema: new MockUserSchema(new Map()),
};
