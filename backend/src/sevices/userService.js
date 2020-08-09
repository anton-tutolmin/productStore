const UserResource = require('../resources/userResource');
const userValidator = require('./validatorService/user');

async function getAllUsers() {
  const users = await UserResource.getAllUsers();
  return users;
}

async function getUserById(id) {
  const user = UserResource.getUserById(id);
  return user;
}

async function getUserByUsername(username) {
  const user = await UserResource.getUserByUsername(username);

  return user;
}

async function createUser(body) {
  const user = await UserResource.createUser(body);
  return user;
}

async function updateUserById(id, body) {
  const params = {};
  for (let param of Object.keys(body)) {
    if (param === 'username') {
      params.username = body[param];
    }

    if (param === 'email') {
      params.email = body[param];
    }

    if (param === 'phone') {
      params.phone = body[param];
    }
  }

  const user = await UserResource.updateUserById(id, params);
  return user;
}

async function deleteUserById(id) {
  await UserResource.deleteUserById(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserById,
  deleteUserById
};