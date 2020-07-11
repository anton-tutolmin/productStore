const UserService = require('../sevices/user');

const UserController = {

  getAllUsers: async (ctx, next) => {
    const users = await UserService.getAllUsers();
    ctx.response.body = {users};
  },

  getUserById: async (ctx, next) => {
    const user = await UserService.getById(id);
    ctx.response.body = {user};
  },

  createUser: async (params) => {
    const user = await UserService.createUser(params);
    return user;
  },

  updateUserById: async (ctx, next) => {
    const id = ctx.params.id;
    const params = ctx.request.body;
    await UserService.updateById(id, params);
    ctx.response.body = {message: 'User updated'};
  },

  deleteUserById: async (ctx, next) => {
    const id = ctx.params.id;
    await UserService.deleteById(id);
    ctx.response.body = {message: 'User deleted'};
  }

}

module.exports = UserController;