const UserResource = require('../resources/user');
const bcrypt = require('bcrypt');
const { createIndexes } = require('../models/User');

const userService = {

  getAllUsers: async () => {
    const users = await UserResource.getAllUsers();
    return user;
  },

  login: async (params) => {
    const username = params.username;
    const password = params.password;

    const user = UserResource.getUserByUsername(username);

    if (!user) {
      throw new Error('There is no user with such username');
    }

    if ()
  },

  const register = async (body) => {
    await UserHandler.register(body)
  },

  const getById = async (id) => {
    const user = await UserHandler.getById(id);
    user = {
      username: user.username,
      email: user.email,
      phone: user.phone
    };
  },

  const updateById = async (id, body) => {
    await UserHandler.updateById(id, body);
  },

  const deleteById = async (id) => {
    await UserHandler.deleteById(id);
    await OrderHandler.deleteByUserId(id);
  },
}



module.exports = userService;