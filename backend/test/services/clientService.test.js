const { ClientService } = require('../../src/sevices/clientService');
const { mockClientResource } = require('../mocks/mockClientResource');
const { mockRatingResource } = require('../mocks/mockRatingResource');
const {
  mockUserValidationService,
} = require('../mocks/mockUserValidationService');

const clientService = new ClientService(
  mockClientResource,
  mockRatingResource,
  mockUserValidationService,
);

let client = {
  username: 'anton',
  password: '1234',
  email: 'anton@test.com',
  phone: '11111111111',
};

describe('Test client service', () => {
  it('create client', async () => {
    const createdClient = await clientService.create(client);

    expect(createdClient.id).not.toBe(undefined);
    expect(createdClient.error).toBe(undefined);
    expect(createdClient.username).toBe('anton');
    expect(createdClient.password).toBe(undefined);
    expect(createdClient.email).toBe('anton@test.com');
    expect(createdClient.phone).toBe('11111111111');
    expect(createdClient.balance).toBe(0);

    client = createdClient;
  });

  it('get client by id', async () => {
    const returnedClient = await clientService.getById(client.id);

    expect(returnedClient).toEqual(client);
  });

  it('get all clients', async () => {
    const clients = await clientService.getAll();

    expect(clients.length).toBe(1);
    expect(clients[0]).toEqual(client);
  });

  it('get user by username', async () => {
    const returnedUser = await clientService.getByUsername(client.username);

    expect(returnedUser).toEqual(client);
  });

  it('update client by id', async () => {
    await clientService.updateById(client.id, { username: 'pavel' });
    const updatedClient = await clientService.getById(client.id);

    expect(updatedClient.username).toBe('pavel');
  });

  it('add client balance', async () => {
    await clientService.addBalance(client.id, 200);
    const updatedUser = await clientService.getById(client.id);

    expect(updatedUser.balance).toBe(200);
  });

  it('reduce client balance', async () => {
    await clientService.reduceBalance(client.id, 120);
    const updatedUser = await clientService.getById(client.id);

    expect(updatedUser.balance).toBe(80);
  });

  it('delete client by id', async () => {
    await clientService.deleteById(client.id);
    const deleted = await clientService.getById(client.id);

    expect(deleted).toBe(null);
  });
});
