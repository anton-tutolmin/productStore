const { CurierService } = require('../../src/sevices/curierService');
const { mockCurierResource } = require('../mocks/mockCurierResource');
const {
  mockUserValidationService,
} = require('../mocks/mockUserValidationService');
const { mockHashPasswordService } = require('../mocks/mockHashPasswordService');

const curierService = new CurierService(
  mockCurierResource,
  mockUserValidationService,
  mockHashPasswordService,
);

let curier = {
  username: 'anton',
  password: '1234',
  email: 'anton@test.com',
  phone: '11111111111',
};
describe('Test curier service', () => {
  it('create curier', async () => {
    const createdCurier = await curierService.create(curier);

    expect(createdCurier.id).not.toBe(undefined);
    expect(createdCurier.username).toBe(curier.username);
    expect(createdCurier.password).toBe(undefined);
    expect(createdCurier.email).toBe(curier.email);
    expect(createdCurier.phone).toBe(curier.phone);

    curier = createdCurier;
  });

  it('get curier by id', async () => {
    const returnedCurier = await curierService.getById(curier.id);

    expect(returnedCurier).toEqual(curier);
  });

  it('get all curier', async () => {
    const returnedCuriers = await curierService.getAll();

    expect(returnedCuriers.length).toBe(1);
    expect(returnedCuriers[0]).toEqual(curier);
  });

  it('get user by username', async () => {
    const returnedUser = await curierService.getByUsername(curier.username);

    expect(returnedUser._id).toEqual(curier.id);
    expect(returnedUser.username).toEqual(curier.username);
    expect(returnedUser.email).toEqual(curier.email);
    expect(returnedUser.phone).toEqual(curier.phone);
    expect(returnedUser.balance).toEqual(curier.balance);
  });

  it('update curier by id', async () => {
    await curierService.updateById(curier.id, { username: 'pavel' });
    const updatedCurier = await curierService.getById(curier.id);

    expect(updatedCurier.username).toBe('pavel');
  });

  it('add balance curier by id', async () => {
    await curierService.addBalance(curier.id, 200);
    const updatedCurier = await curierService.getById(curier.id);

    expect(updatedCurier.balance).toBe(200);
  });

  it('delete curier by id', async () => {
    await curierService.deleteById(curier.id);
    const deleted = await curierService.getById(curier.id);

    expect(deleted).toBe(null);
  });
});
