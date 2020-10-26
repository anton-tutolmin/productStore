const { CurierController } = require('../../src/controllers/curierController');
const { mockCurierService } = require('../mocks/mockCurierService');

const curierController = new CurierController(mockCurierService);

let curier = {
  username: 'anton',
  password: '1234',
  email: 'anton@test.com',
  phone: '11111111111',
};

describe('Test curier controller', () => {
  it('create curier', async () => {
    const ctx = {
      request: {
        body: curier,
      },
      response: {},
    };

    await curierController.create(ctx, () => {});

    expect(ctx.response.body.user.username).toBe('anton');
    expect(ctx.response.body.user.email).toBe('anton@test.com');
    expect(ctx.response.body.user.phone).toBe('11111111111');
    expect(ctx.response.body.user.balance).toBe(0);
    expect(ctx.response.body.user.status).toBe('open');

    curier = ctx.response.body.user;
  });

  it('get curier by id', async () => {
    const ctx = {
      params: { id: curier._id },
      request: {},
      response: {},
    };

    await curierController.getById(ctx, () => {});

    expect(ctx.response.body.curier).toEqual(curier);
  });

  it('get all curier', async () => {
    const ctx = {
      request: {},
      response: {},
    };

    await curierController.getAll(ctx, () => {});

    expect(ctx.response.body.curiers.length).toBe(1);
    expect(ctx.response.body.curiers[0]).toEqual(curier);
  });

  it('update curier by id', async () => {
    const ctx = {
      params: { id: curier._id },
      request: { body: { username: 'pavel' } },
      response: {},
    };

    await curierController.updateById(ctx, () => {});

    expect(ctx.response.body.message).toBe('User updated');

    await curierController.getById(ctx, () => {});

    expect(ctx.response.body.curier.username).toBe('pavel');
  });

  it('delete curier by id', async () => {
    const ctx = {
      params: { id: curier._id },
      request: {},
      response: {},
    };

    await curierController.deleteById(ctx, () => {});

    expect(ctx.response.body.message).toBe('User deleted');

    await curierController.getById(ctx, () => {});

    expect(ctx.response.body.curier).toBe(undefined);
  });
});
