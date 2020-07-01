const Order = require('../models/Order');

const dbOrder = {

  create: async (body) => {
    await Order.create({
      ...body
    })
  },

  getAll: async () => {
    const orders = await Order.find({});
    return orders;
  },

  getById: async (id) => {
    const order = await Order.findOne({
      _id: id
    })
  },

  updateById: async (id, body) => {
    await Order.updateOne({_id: id}, {...body});
  },

  deleteById: async (id) => {
    await Order.deleteOne({_id: id});
  }

}

module.exports = dbOrder;