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
    const ctx = {
      request: { body: client },
      response: {},
    };

    await clientController.create(ctx, () => {});

    expect(ctx.response.body.client.username).toBe('anton');
    expect(ctx.response.body.client.email).toBe('anton@test.com');
    expect(ctx.response.body.client.phone).toBe('11111111111');

    client = ctx.response.body.client;
  });

  it('get client by id', async () => {
    const ctx = {
      params: { id: client._id },
      response: {},
    };

    await clientController.getById(ctx, () => {});

    expect(ctx.response.body.client).toEqual(client);
  });

  it('get all clients', async () => {
    const ctx = {
      request: {},
      response: {},
    };

    await clientController.getAll(ctx, () => {});

    expect(ctx.response.body.clients.length).toBe(1);
    expect(ctx.response.body.clients[0]).toEqual(client);
  });

  it('update client by id', async () => {
    const ctx = {
      params: {
        id: client._id,
      },
      request: { body: { username: 'pavel' } },
      response: {},
    };

    await clientController.updateById(ctx, () => {});

    expect(ctx.response.body.message).toBe('User updated');

    await clientController.getById(ctx);

    expect(ctx.response.body.client.username).toBe('pavel');
  });

  it('delete by id', async () => {
    const ctx = {
      params: { id: client._id },
      request: {},
      response: {},
    };

    await clientController.deleteById(ctx, () => {});

    expect(ctx.response.body.message).toBe('User deleted');

    await clientController.getById(ctx, () => {});

    expect(ctx.response.body.client).toBe(undefined);
  });
});
