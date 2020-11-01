const mongoose = require('mongoose');
const Order = require('../models/Order');
const Candidate = require('../models/Candidates');
const errors = require('../errors/errors');

class OrderMongoResource {
  constructor(orderSchema, candidatesSchema, Mongoose) {
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

  async setCandidate(orderId, curierId) {
    this.validateId(orderId);
    this.validateId(curierId);
    await this.candidatesSchema.create({ orderId, curierId });
  }

  async getCandidatesByOrderId(orderId) {
    this.validateId(orderId);
    return await this.candidatesSchema.find({ orderId });
  }

  async getCandidatesByCurierId(curierId) {
    this.validateId(curierId);
    return await this.candidatesSchema.find({ curierId });
  }

  async deleteCandidatesByCurierId(curierId) {
    this.validateId(curierId);
    await this.candidatesSchema.delete({ curierId });
  }

  async deleteCandidatesByOrderId(orderId) {
    this.validateId(orderId);
    await this.candidatesSchema.delete({ orderId });
  }

  validateId(id) {
    if (!this.Mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errors.notCorrectOrderId);
    }
  }
}

module.exports = {
  OrderMongoResource,
  Candidate,
  orderMongoResource: new OrderMongoResource(Order, mongoose),
};
