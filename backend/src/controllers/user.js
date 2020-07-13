const UserService = require('../sevices/userService');

const UserController = {

  getAllUsers: async (ctx, next) => {
    const users = await UserService.getAllUsers();
    ctx.response.body = {users};
  },

  getUserById: async (ctx, next) => {
    const user = await UserService.getUserById(ctx.params.id);
    ctx.response.body = {user};
  },

  createUser: async (ctx, next) => {
    const user = await UserService.createUser(ctx.request.body);
    ctx.response.body = {user}
  },

  updateUserById: async (ctx, next) => {
    const id = ctx.params.id;
    await UserService.updateUserById(id, ctx.request.body);
    ctx.response.body = {message: 'User updated'}
  },

  deleteUserById: async (ctx, next) => {
    const id = ctx.params.id;
    await UserService.deleteUserById(id);
    ctx.response.body = {message: 'User deleted'}
  }

}

module.exports = UserController;