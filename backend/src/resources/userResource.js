const User = require('../models/User');
const { Types } = require('mongoose');

async function createUser(body) {
  const user = await User.create({...body});
  return user;
}

async function getAllUsers() {
  const users = await User.find({});
  return users;
}

async function getUserById(id) {
  validateId(id);
  
  const user = await User.findOne({_id: id});
  return user;
}

async function getUserByUsername(username) {
  const user = await User.findOne({username});
  return user;
}

async function updateUserById(id, params) {
  validateId(id);
  await User.updateOne({_id: id}, {...params});
}

async function deleteUserById(id) {
  validateId(id);
  await User.deleteOne({_id: id});
}

function validateId(id) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Not valid id');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserById,
  deleteUserById
};