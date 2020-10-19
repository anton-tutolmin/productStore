const { clientService } = require('../sevices/clientService');

async function create(body) {
  const user = await clientService.create(body);
  return user;
}

async function getAll() {
  const users = await clientService.getAll();
  return users;
}

async function getById(id) {
  const user = await clientService.getById(id);
  return user;
}

async function updateById(id, params, user) {
  await clientService.updateById(id, params);
}

async function deleteById(id) {
  await clientService.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
