const KoaRouter = require('koa-router');
const OrderController = require('../controllers/ordersController');

const router = new KoaRouter();

router

  // for clients - create new order
  .post('/orders', async (ctx, next) => {
    await OrderController.create();
  })

  // get information about order
  .get('/orders:id')

  // for clients - change status if order not delivering
  // for curier - change status on delivering & delivered
  .put('/orders:id')

  // for clients - list their orders
  // for curier - list avaliable for deliver orders
  .get('/users/:id/orders')

module.exports = router;