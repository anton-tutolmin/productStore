const UserService = require('../sevices/userService');

async function getAllUsers(ctx, next) {
  const users = await UserService.getAllUsers();
  ctx.response.body = {users};
}

async function getUserById(ctx, next) {
  const user = await UserService.getUserById(ctx.params.id);
  ctx.response.body = {user};
}

async function createUser(ctx, next) {
  const user = await UserService.createUser(ctx.request.body);
  ctx.response.body = {user}
}

async function updateUserById(ctx, next) {
  const id = ctx.params.id;
  await UserService.updateUserById(id, ctx.request.body);
  ctx.response.body = {message: 'User updated'}
}

async function deleteUserById(ctx, next) {
  const id = ctx.params.id;
  await UserService.deleteUserById(id);
  ctx.response.body = {message: 'User deleted'}
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
};