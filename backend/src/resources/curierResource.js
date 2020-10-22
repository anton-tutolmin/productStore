const Curier = require('../models/Curier');
const mongoose = require('mongoose');
const errors = require('../errors/errors');

class CurierMongoResource {
  constructor(curierSchema, Mongoose) {
    this.curierSchema = curierSchema;
    this.Mongoose = Mongoose;
  }

  async create(body) {
    return await this.curierSchema.create({ ...body });
  }

  async getAll() {
    return await this.curierSchema.find({});
  }

  async getById(id) {
    this.validateId(id);
    return await this.curierSchema.findOne({ _id: id });
  }

  async getByUsername(username) {
    return await this.curierSchema.findOne({ username });
  }

  async updateById(id, params) {
    this.validateId(id);
    await this.curierSchema.updateOne({ _id: id }, { ...params });
  }

  async deleteById(id) {
    this.validateId(id);
    await this.curierSchema.deleteOne({ _id: id });
  }

  validateId(id) {
    if (!this.Mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errors.notCorrectId);
    }
  }
}

module.exports = {
  CurierMongoResource,
  curierMongoResource: new CurierMongoResource(Curier, mongoose),
};
