const OrderService = require('../sevices/orderService');
const ProductService = require('../sevices/productService');
const { clientService } = require('../sevices/clientService');

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

async function getByUserId(userId) {
  const orders = await OrderService.getByUserId(userId);
  const response = [];

  for (const order of orders) {
    const user = await clientService.getById(order.clientId);
    const product = await ProductService.getById(order.productId);

    response.push({
      id: order._id,
      productId: order.productId,
      clientId: order.clientId,
      curierId: order.curierId,
      status: order.status,
      product: {
        productname: product.productname,
        coast: product.coast,
        img: product.img,
      },
      client: {
        username: user.username,
        phone: user.phone,
      },
    });
  }

  return response;
}

async function getRequests() {
  const orders = await OrderService.getRequests();
  const response = [];

  for (const order of orders) {
    const user = await clientService.getById(order.clientId);
    const product = await ProductService.getById(order.productId);

    response.push({
      id: order._id,
      productId: order.productId,
      clientId: order.clientId,
      curierId: order.curierId,
      status: order.status,
      product: {
        productname: product.productname,
        coast: product.coast,
        img: product.img,
      },
      client: {
        username: user.username,
        phone: user.phone,
      },
    });
  }

  return response;
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
  getByUserId,
  getRequests,
  updateById,
  deleteById,
  deleteByClientId,
  deleteByProductId,
};
