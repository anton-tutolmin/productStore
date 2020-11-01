const { CurierMongoResource } = require('../../src/resources/curierResource');
const { mockUserSchema } = require('../mocks/mockUserSchema');
const { mockMongoose } = require('../mocks/mockMongoose');

const curierResource = new CurierMongoResource(mockUserSchema, mockMongoose);

let curier = {
  username: 'anton',
  password: '1234',
  email: 'anton@test.com',
  phone: '11111111111',
  balance: 0,
  status: 'open',
};

describe('Test curier resource', () => {
  it('create curier', async () => {
    const createdCurier = await curierResource.create(curier);

    expect(createdCurier._id).not.toBe(undefined);
    expect(createdCurier.username).toBe(curier.username);
    expect(createdCurier.password).toBe(curier.password);
    expect(createdCurier.email).toBe(curier.email);
    expect(createdCurier.phone).toBe(curier.phone);
    expect(createdCurier.balance).toBe(curier.balance);
    expect(createdCurier.status).toBe(curier.status);

    curier = createdCurier;
  });

  it('get curier by id', async () => {
    const returnedCurier = await curierResource.getById(curier._id);

    expect(returnedCurier).toEqual(curier);
  });

  it('get all curier', async () => {
    const returnedCuriers = await curierResource.getAll();

    expect(returnedCuriers.length).toBe(1);
    expect(returnedCuriers[0]).toEqual(curier);
  });

  it('get curier by username', async () => {
    const returnedCurier = await curierResource.getByUsername(curier.username);

    expect(returnedCurier).toEqual(curier);
  });

  it('update curier by id', async () => {
    await curierResource.updateById(curier._id, { username: 'pavel' });
    const updatedCurier = await curierResource.getById(curier._id);

    expect(updatedCurier.username).toBe('pavel');
  });

  it('delete curier by id', async () => {
    await curierResource.deleteById(curier._id);
    const deleted = await curierResource.getById(curier._id);

    expect(deleted).toBe(undefined);
  });
});
