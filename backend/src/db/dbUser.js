const User = require('../models/User');

const dbUser = {

  create: async (body) => {
    await User.create({
      username: body.username,
      email: body.email,
      phone: body.phone,
      password: body.password,
    });
  },

  getById: async (id) => {
    const user = await User.findOne({
      _id: id
    });
    return user;
  },

  getAll: async () => {
    const users = await User.find({});
    return users;
  },

  updateById: async (id, body) => {
    await User.update({_id: id}, {...body})
  },

  deleteById: async (id) => {
    await User.deleteOne({_id: id});
  }

}

module.exports = dbUser;