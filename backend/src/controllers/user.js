const UserService = require('../sevices/user');

const UserController = {

  getAllUsers: async (ctx, next) => {
    const users = await UserService.getAllUsers();
    ctx.response.body = {users};
    next();
  },

  getUserById: async (ctx, next) => {
    const user = await UserService.getById(id);
    ctx.response.body = {user};
    next();
  },

  login: async (ctx, next) => {
    const params = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    };
    await UserService.login(params);
    ctx.response.body = {message: 'User login'};
    next();
  },

  register: async (ctx, next) => {
    const params = {
      username: ctx.request.body.username,
      email: ctx.request.body.email,
      phone: ctx.request.body.phone,
      password: ctx.request.body.password
    };
    await UserService.login(params);
    ctx.response.body = {message: 'User registered'};
    next();
  },

  updateUserById: async (ctx, next) => {
    const id = ctx.params.id;
    const params = ctx.request.body;
    await UserService.updateById(id, params);
    ctx.response.body = {message: 'User updated'};
    next();
  },

  deleteUserById: async (ctx, next) => {
    const id = ctx.params.id;
    await UserService.deleteById(id);
    ctx.response.body = {message: 'User deleted'};
    next();
  }

}

module.exports = UserController;