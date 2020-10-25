const { ClientMongoResource } = require('../../src/resources/clientResource');
const { mockUserSchema } = require('../mocks/mockUserSchema');
const { mockMongoose } = require('../mocks/mockMongoose');

const clientResource = new ClientMongoResource(mockUserSchema, mockMongoose);

let client = {
  username: 'anton',
  password: '1234',
  email: 'anton@test.com',
  phone: '11111111111',
  balance: 0,
};

describe('Test client resource', () => {
  it('create client', async () => {
    const createdClient = await clientResource.create(client);

    expect(createdClient._id).not.toBe(undefined);
    expect(createdClient.username).toBe(client.username);
    expect(createdClient.password).toBe(client.password);
    expect(createdClient.email).toBe(client.email);
    expect(createdClient.phone).toBe(client.phone);
    expect(createdClient.balance).toBe(client.balance);

    client = createdClient;
  });

  it('get client by id', async () => {
    const returnedClient = await clientResource.getById(client._id);

    expect(returnedClient).toEqual(client);
  });

  it('get all clients', async () => {
    const returnedClients = await clientResource.getAll();

    expect(returnedClients.length).toBe(1);
    expect(returnedClients[0]).toEqual(client);
  });

  it('get client by username', async () => {
    const returnedClient = await clientResource.getByUsername('anton');

    expect(returnedClient).toEqual(client);
  });

  it('update client by id', async () => {
    await clientResource.updateById(client._id, { username: 'pavel' });
    const updateClient = await clientResource.getById(client._id);

    expect(updateClient.username).toBe('pavel');
  });

  it('delete client by id', async () => {
    await clientResource.deleteById(client._id);
    const deleted = await clientResource.getById(client._id);

    expect(deleted).toBe(undefined);
  });
});
