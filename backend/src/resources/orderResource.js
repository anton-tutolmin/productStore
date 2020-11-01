const mongoose = require('mongoose');
const Order = require('../models/Order');
const errors = require('../errors/errors');

class OrderMongoResource {
  constructor(orderSchema, Mongoose) {
    this.orderSchema = orderSchema;
    this.Mongoose = Mongoose;
  }

  async create(body) {
    return await this.orderSchema.create(body);
  }

  async getAll() {
    return await this.orderSchema.find({});
  }

  async getById(id) {
    this.validateId(id);
    return await this.orderSchema.findOne({ _id: id });
  }

  async getByClientId(clientId) {
    return await this.orderSchema.find({ clientId });
  }

  async getByCurierId(curierId) {
    return await this.orderSchema.find({ curierId });
  }

  async getByProductId(productId) {
    return await this.orderSchema.find({ productId });
  }

  async getRequests() {
    return await this.orderSchema.find({ curierId: 'none', status: 'created' });
  }

  async updateById(id, params) {
    this.validateId(id);
    await this.orderSchema.updateOne({ _id: id }, { ...params });
  }

  async deleteById(id) {
    this.validateId(id);
    await this.orderSchema.deleteOne({ _id: id });
  }

  async deleteByClientId(clientId) {
    await this.orderSchema.deleteMany({ clientId });
  }

  async deleteByProductId(productId) {
    await this.orderSchema.deleteMany({ productId });
  }

  validateId(id) {
    if (!this.Mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errors.notCorrectOrderId);
    }
  }
}

module.exports = {
  OrderMongoResource,
  orderMongoResource: new OrderMongoResource(Order, mongoose),
};
