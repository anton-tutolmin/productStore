const User = require('../models/User');

const UserResource = {

  getAllUsers: async () => {
    const users = await User.find({});
    return users;
  },

  getUserById: async (id) => {
    const user = await User.findOne({_id: id});
    return user;
  },

  getUserByUsername: async (username) => {
    const user = await User.findOne({username});
    return user;
  },

  createUser: async (params) => {
    const user = await User.create({
      ...params
    });
    return user;
  },

  updateUserById: async (id, params) => {
    await User.updateOne(
      {
        _id: id
      },
      {
        ...params
      }
    );
  },

  deleteUserById: async (id) => {
    await User.deleteOne({_id: id});
  }
}

module.exports = UserResource;