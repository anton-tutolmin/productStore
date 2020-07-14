const User = require('../models/User');

async function getAllUsers() {
  const users = await User.find({});
  return users;
}

async function getUserById(id) {
  const user = await User.findOne({_id: id});
  return user;
}

async function getUserByUsername(username) {
  const user = await User.findOne({username});
  return user;
}

async function createUser(params) {
  const user = await User.create({
    ...params
  });
  return user;
}

async function updateUserById(id, params) {
  await User.updateOne(
    {
      _id: id
    },
    {
      ...params
    }
  );
}

async function deleteUserById(id) {
  await User.deleteOne({_id: id});
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserById,
  deleteUserById
};