const UserService = require('../sevices/user');

const UserController = {

  getAllUsers: async () => {
    const users = await UserService.getAll();
    return users;
  },

  getUserById: async (id) => {
    const user = await UserService.getById(id);
    return id;
  },

  login: async (params) => {
    await UserService.login(params);
  },

  register: async (params) => {
    await UserService.login(params);
  },

  updateUserById: async (id, params) => {
    await UserService.updateById(params);
  },

  deleteUserById: async (id) => {
    await UserService.deleteById(id);
  }

}

module.exports = UserController;