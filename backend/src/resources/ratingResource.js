const mongoose = require('mongoose');
const errors = require('../errors/errors');
const Rating = require('../models/Rating');

class RatingMongoResource {
  constructor(ratingSchema, Mongoose) {
    this.ratingSchema = ratingSchema;
    this.Mongoose = Mongoose;
  }

  async add({ clientId, curierId, rating }) {
    this.validateId(clientId);
    this.validateId(curierId);
    return await this.ratingSchema.create({ clientId, curierId, rating });
  }

  async getByCurierId(curierId) {
    this.validateId(curierId);
    return await this.ratingSchema.find({ curierId });
  }

  async getByClientId(clientId) {
    this.validateId(clientId);
    return await this.ratingSchema.find({ clientId });
  }

  async isExist({ clientId, curierId }) {
    this.validateId(clientId);
    this.validateId(curierId);
    return await this.ratingSchema.exists({ clientId, curierId });
  }

  async remove({ clientId, curierId }) {
    this.validateId(clientId);
    this.validateId(curierId);
    return await this.ratingSchema.deleteOne({ clientId, curierId });
  }

  validateId(id) {
    if (!this.Mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errors.notCorrectRatingId);
    }
  }
}

module.exports = {
  RatingMongoResource,
  ratingMongoResource: new RatingMongoResource(Rating, mongoose),
};
