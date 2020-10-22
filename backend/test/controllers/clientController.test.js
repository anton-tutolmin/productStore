const { ClientController } = require('../../src/controllers/clientController');
const { mockClientService } = require('../mocks/mockClientService');

const clientController = new ClientController(mockClientService);

let client = {
  username: 'anton',
  password: '1234',
  email: 'anton@test.com',
  phone: '11111111111',
};

describe('Test clientController:', () => {
  it('create client', async () => {
    const createdClient = await clientController.create(client);

    expect(client.username).toBe('anton');
    expect(client.email).toBe('anton@test.com');
    expect(client.phone).toBe('11111111111');

    client = createdClient;
  });

  it('get client by id', async () => {
    const returnedClient = await clientController.getById(client._id);

    expect(returnedClient).toEqual(client);
  });

  it('get all clients', async () => {
    const returnedClients = await clientController.getAll();

    expect(returnedClients.length).toBe(1);
    expect(returnedClients[0]).toEqual(client);
  });

  it('update client by id', async () => {
    await clientController.updateById(client._id, { username: 'pavel' });
    const updatedClient = await clientController.getById(client._id);

    expect(updatedClient.username).toBe('pavel');
  });

  it('delete by id', async () => {
    await clientController.deleteById(client._id);
    const deleted = await clientController.getById(client._id);

    expect(deleted).toBe(undefined);
  });
});
