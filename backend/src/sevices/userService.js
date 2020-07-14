const UserResource = require('../resources/user');
const Bcrypt = require('../config/bcrypt');

const userService = {

  getAllUsers: async () => {
    const users = await UserResource.getAllUsers();
    return users;
  },

  getUserById: async (id) => {
    const user = UserResource.getUserById(id);
    return user;
  },

  getUserByUsername: async (username) => {
    const user = await UserResource.getUserByUsername(username);
    return user;
  },

  createUser: async (body) => {
    const hashedPassword = await Bcrypt.hashPassword(body.password);
    const params = {
      username: body.username,
      email: body.email,
      phone: body.phone,
      password: hashedPassword
    }
    const user = await UserResource.createUser(params);
    return user;
  },

  updateUserById: async (id, body) => {
    const params = {
      username: body.username,
      email: body.email,
      phone: body.phone
    }
    await UserResource.updateUserById(id, params);
  },

  deleteUserById: async (id) => {
    await UserResource.deleteUserById(id);
  }

}

module.exports = userService;