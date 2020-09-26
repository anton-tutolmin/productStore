const UserResource = require('../resources/userResource');
const userValidator = require('./validatorService/user');

async function create(body) {
  const createBody = {
    username: body.username,
    password: body.password,
    email: body.email,
    phone: body.phone,
    type: body.type,
    balance: 0
  }

  userValidator.validateCreateBody(createBody);
  const user = await UserResource.create(createBody);
  return user;
}

async function getAll() {
  let users = await UserResource.getAll();
  return users;
}

async function getById(id) {
  let user = await UserResource.getById(id);
  return user;
}

async function getByUsername(username) {
  let user = await UserResource.getByUsername(username);
  return user;
}

async function updateById(id, body) {
  const params = {};
  for (let param of Object.keys(body)) {
    if (param === 'username') params.username = body[param];
    if (param === 'email') params.email = body[param];
    if (param === 'phone') params.phone = body[param];
    if (param === 'type') params.type = body[param];
    if (param === 'balance') {
      const user = await UserResource.getById(id);
      params.balance = user.balance + body[param];
    }
  }

  userValidator.validateUpdateBody(params);
  await UserResource.updateById(id, params);
}

async function deleteById(id) {
  await UserResource.deleteById(id);
}

async function addBalance(id, coast) {
  const user = await UserResource.getById(id);
  const balance = user.balance + +coast;
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