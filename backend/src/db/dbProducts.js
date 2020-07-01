const Product = require('../models/Product');

const dbProducts = {

  create: async (body) => {
    await Product.create({
      ...body
    });
  },

  getAll: async () => {
    const products = await Product.find({});
    return products;
  },

  getById: async (id) => {
    const product = await Product.findOne({
      _id: id
    });
    return product;
  },

  updateById: (id, body) => {
    await Product.updateOne({_id: id}, {...body});
  },

  deleteById: (id) => {
    await Product.deleteOne({_id: id});
  }
}

module.exports = dbProducts;