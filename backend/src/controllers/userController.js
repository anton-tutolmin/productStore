const UserService = require('../sevices/userService');

async function create(body) {
  const user = await UserService.create(body);
  return user;
}

async function getAll() {
  const users = await UserService.getAll();
  return users;
}

async function getById(id) {
  const user = await UserService.getById(id);
  return user;
}

async function updateById(id, params) {
  const user = await UserService.updateById(id, params);
  return user;
}

async function deleteById(id) {
  await UserService.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};