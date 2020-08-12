const OrderResource = require('../resources/orderResource');
const UserService = require('./userService');
const ProductService = require('./productService');
const validator = require('./validatorService/order');

async function create(body) {
  const user = await UserService.getById(body.authorId);
  if (!user) throw new Error('No such user');

  const product = await ProductService.getById(body.productId);
  if (!product) throw new Error('No such product');

  if (user.balance < product.coast)
    throw new Error('Not enough money');

  const newBalance = user.balance - product.coast;

  await UserService.updateById(user._id, {balance: newBalance});

  const createBody = {
    status: 'created',
    authorId: body.authorId,
    productId: body.productId
  }

  const order = await OrderResource.create(createBody);
  return order;
}

async function getAll() {
  const orders = await OrderResource.getAll();
  return orders;
}

async function getById(id) {
  const order = await OrderResource.getById(id);
  return order;
}

async function getByAuthorId(authorId) {
  const orders = await OrderResource.getByAuthorId(authorId);
  return orders;
}

async function getByProductId(productId) {
  const orders = await OrderResource.getByProductId(productId);
  return orders;
}

async function updateById(id, params) {
  const order = await OrderResource.getById(id);

  validator.validateUpdateBody(params.status, order.status);

  await OrderResource.updateById(id, params);
  const order = OrderResource.getById(id);
  return order;
}

async function deleteById(id) {
  await OrderResource.deleteById(id);
}

async function deleteByAuthorId(authorId) {
  await OrderResource.deleteByAuthorId(authorId);
}

async function deleteByProductId(productId) {
  await OrderResource.deleteByAuthorId(productId);
}

module.exports = {
  create,
  getAll,
  getById,
  getByAuthorId,
  getByProductId,
  updateById,
  deleteById,
  deleteByAuthorId,
  deleteByProductId,
}