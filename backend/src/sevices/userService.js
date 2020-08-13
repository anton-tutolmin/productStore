const UserResource = require('../resources/userResource');
const userValidator = require('./validatorService/user');

async function create(body) {
  userValidator.validateCreateBody(body);
  const user = await UserResource.create(body);
  return user;
}

async function getAll() {
  const users = await UserResource.getAll();
  return users;
}

async function getById(id) {
  const user = UserResource.getById(id);
  return user;
}

async function getByUsername(username) {
  const user = await UserResource.getByUsername(username);
  return user;
}

async function updateById(id, body) {
  const params = {};
  for (let param of Object.keys(body)) {
    if (param === 'username') params.username = body[param];
    if (param === 'email') params.email = body[param];
    if (param === 'phone') params.phone = body[param];
    if (param === 'type') params.type = body[param];
  }

  userValidator.validateUpdateBody(params);

  await UserResource.updateById(id, params);
  const user = await UserResource.getById(id);
  return user;
}

async function deleteById(id) {
  await UserResource.deleteById(id);
}

async function addBalance(id, coast) {
  const user = await UserResource.getById(id);
  const balance = user.balance + coast;
  await UserResource.updateById(id, {balance});
}

async function reduceBalance(id, coast) {
  const user = await UserResource.getById(id);
  const balance = user.balance - coast;
  await UserResource.updateById(id, {balance});
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  create,
  updateById,
  deleteById,
  addBalance,
  reduceBalance
};