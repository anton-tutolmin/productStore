const OrderService = require('../sevices/orderService');
const ProductService = require('../sevices/productService');

async function create(body, user) {
  const order = await OrderService.create(body, user);
  return order;
}

async function getAll() {
  const orders = await OrderService.getAll();
  return orders;
}

async function getById(id) {
  const order = await OrderService.getById(id);
  return order;
}

async function getByClientId(clientId) {
  let orders = await OrderService.getByClientId(clientId);
  let response = [];

  for (let order of orders) {
    response.push({
      id: order._id,
      productId: order.productId,
      clientId: order.clientId,
      curierId: order.curierId,
      product: await ProductService.getById(order.productId)
    });
  }

  return response;
}

async function getByCurierId(curierId) {
  const orders = await OrderService.getByCurierId(curierId)
}

async function updateById(id, params, user) {
  await OrderService.updateById(id, params, user);
}

async function deleteById(id) {
  await OrderService.deleteById(id);
}

async function deleteByClientId(clientId) {
  await OrderService.deleteByClientId(clientId);
}

async function deleteByProductId(productId) {
  await OrderService.deleteByProductId(productId);
}

module.exports = {
  create,
  getAll,
  getById,
  getByClientId,
  getByCurierId,
  updateById,
  deleteById,
  deleteByClientId,
  deleteByProductId,
}