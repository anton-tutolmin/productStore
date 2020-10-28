const Product = require('../models/Product');
const errors = require('../errors/errors');

class ProductResource {
  constructor(productSchema, Mongoose) {
    this.productSchema = productSchema;
    this.Mongoose = Mongoose;
  }

  async create(product) {
    return await this.productSchema.create(product);
  }

  async getAll() {
    return await this.productSchema.find({});
  }

  async getById(id) {
    this.validateId(id);
    return await this.productSchema.findOne({ _id: id });
  }

  async updateById(id, params) {
    this.validateId(id);
    await this.productSchema.updateOne({ _id: id }, { ...params });
  }

  async deleteById(id) {
    this.validateId(id);
    await this.productSchema.deleteOne({ _id: id });
  }

  validateId(id) {
    if (!this.Mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errors.notCorrectId);
    }
  }
}

module.exports = {
  ProductResource,
};
