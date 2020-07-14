const UserResource = require('../resources/user');
const Bcrypt = require('../config/bcrypt');

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
  const hashedPassword = await Bcrypt.hashPassword(body.password);
  const params = {
    username: body.username,
    email: body.email,
    phone: body.phone,
    password: hashedPassword
  }
  const user = await UserResource.createUser(params);
  return user;
}

async function updateUserById(id, body) {
  const params = {
    username: body.username,
    email: body.email,
    phone: body.phone
  }
  await UserResource.updateUserById(id, params);
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