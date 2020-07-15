const UserResource = require('../resources/userResource');
const Bcrypt = require('../config/bcrypt');
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
  userValidator.validateCreateBody(body);
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
  userValidator.validateUpdateBody(body);

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