const UserResource = require('../resources/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userService = {

  getAllUsers: async () => {
    const users = await UserResource.getAllUsers();
    return users;
  },

  getUserById: async (id) => {
    const user = UserResource.getUserById(id);
    return user;
  },

  login: async (params) => {
    const username = params.username;
    const password = params.password;

    const user = await UserResource.getUserByUsername(username);

    if (!user) {
      throw new Error('There is no such user');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Wrong password');
    }

    const token = jwt.sign({id: user._id}, process.env.KEY);
    
    return token;
  },

}



module.exports = userService;