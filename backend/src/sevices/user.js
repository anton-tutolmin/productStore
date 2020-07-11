const UserResource = require('../resources/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createIndexes } = require('../models/User');

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

  createUser: async (params) => {
    const user = await UserResource.createUser(params);
    return user;
  }

}

// const validateUsername = (username) => {
//   if (
//     !username ||
//     typeof username !== 'string' ||
//     username.length > 20 ||
//     username.length < 4 ||
//     username.match(/[^A-Za-z]/g) !== null
//   )
//   {
//     throw new Error('Username is not correct');
//   }
// }

// const validatePassword = (password) => {
//   if (
//     !password ||
//     typeof password !== 'string' ||
//     password.length > 30 ||
//     password.length < 5 ||
//     password.match(/[^A-Za-z0-9]/g) !== null
//   )
//   {
//     throw new Error('Password is not correct');
//   }
// }


module.exports = userService;