const Curier = require('../models/Curier');
const { Types } = require('mongoose');
const errors = require('../errors/errors');

async function create(body) {
  const user = await Curier.create({ ...body });
  return user;
}

async function getAll() {
  const users = await Curier.find({});
  return users;
}

async function getById(id) {
  validateId(id);

  const user = await Curier.findOne({ _id: id });
  return user;
}

async function getByUsername(username) {
  const user = await Curier.findOne({ username });
  return user;
}

async function updateById(id, params) {
  validateId(id);
  await Curier.updateOne({ _id: id }, { ...params });
}

async function deleteById(id) {
  validateId(id);
  await Curier.deleteOne({ _id: id });
}

function validateId(id) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(errors.notCorrectId);
  }
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  create,
  updateById,
  deleteById,
};
