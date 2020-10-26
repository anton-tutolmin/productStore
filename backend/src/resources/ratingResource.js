const mongoose = require('mongoose');
const Rating = require('../models/Rating');

class RatingMongoResource {
  constructor(ratingSchema, Mongoose) {
    this.ratingSchema = ratingSchema;
    this.Mongoose = Mongoose;
  }

  async add({ clientId, curierId, rating }) {
    return await this.ratingSchema.create({ clientId, curierId, rating });
  }

  async remove({ clientId, curierId }) {
    return await this.ratingSchema.deleteOne({ clientId, curierId });
  }

  async getByCurierId(curierId) {
    return await this.ratingSchema.findAll({ curierId });
  }

  async getByClientId(clientId) {
    return await this.ratingSchema.findAll({ clientId });
  }

  async isExist(clientId, curierId) {
    return await this.ratingSchema.exists({ clientId, curierId });
  }
}

module.exports = {
  RatingMongoResource,
  ratingMongoResource: new RatingMongoResource(Rating, mongoose),
};
