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
    const createdCurier = await curierController.create(curier);

    expect(createdCurier.username).toBe('anton');
    expect(createdCurier.email).toBe('anton@test.com');
    expect(createdCurier.phone).toBe('11111111111');
    expect(createdCurier.balance).toBe(0);
    expect(createdCurier.status).toBe('open');

    curier = createdCurier;
  });

  it('get curier by id', async () => {
    const returnedCurier = await curierController.getById(curier._id);

    expect(returnedCurier).toEqual(curier);
  });

  it('get all curier', async () => {
    const returnedCuriers = await curierController.getAll();

    expect(returnedCuriers.length).toBe(1);
    expect(returnedCuriers[0]).toEqual(curier);
  });

  it('update curier by id', async () => {
    await curierController.updateById(curier._id, { username: 'pavel' });
    const updatedCurier = await curierController.getById(curier._id);

    expect(updatedCurier.username).toBe('pavel');
  });

  it('delete curier by id', async () => {
    await curierController.deleteById(curier._id);
    const deleted = await curierController.getById(curier._id);

    expect(deleted).toBe(undefined);
  });
});
