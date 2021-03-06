const Client = require('../models/Client');
const mongoose = require('mongoose');
const errors = require('../errors/errors');

class ClientMongoResource {
  constructor(clientSchema, Mongoose) {
    this.clientSchema = clientSchema;
    this.Mongoose = Mongoose;
  }

  async create(client) {
    return await this.clientSchema.create(client);
  }

  async getAll() {
    return await this.clientSchema.find({});
  }

  async getById(id) {
    this.validateId(id);
    return await this.clientSchema.findOne({ _id: id });
  }

  async getByUsername(username) {
    return await this.clientSchema.findOne({ username });
  }

  async updateById(id, params) {
    this.validateId(id);
    await this.clientSchema.updateOne({ _id: id }, { ...params });
  }

  async deleteById(id) {
    this.validateId(id);
    await this.clientSchema.deleteOne({ _id: id });
  }

  async isExist(clientId) {
    this.validateId(clientId);
    return await this.clientSchema.exists({ _id: clientId });
  }

  validateId(id) {
    if (!this.Mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errors.notCorrectClientId);
    }
  }
}

module.exports = {
  ClientMongoResource,
  clientMongoResource: new ClientMongoResource(Client, mongoose),
};
