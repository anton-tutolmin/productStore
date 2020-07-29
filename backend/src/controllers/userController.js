const UserService = require('../sevices/userService');

async function getAllUsers() {
  const users = await UserService.getAllUsers();
  return users;
}

async function getUserById(id) {
  const user = await UserService.getUserById(id);
  return user;
}

async function createUser(body) {
  const user = await UserService.createUser(body);
  return user;
}

async function updateUserById(id, params) {
  const user = await UserService.updateUserById(id, params);
  return user;
}

async function deleteUserById(id) {
  await UserService.deleteUserById(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};