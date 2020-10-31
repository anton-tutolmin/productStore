const KoaRouter = require('koa-router');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');
const { orderController } = require('../controllers/orderController');

const router = new KoaRouter();

router

  .post(
    '/api/orders',
    jwtMiddleware,
    orderController.create.bind(orderController),
  )

  .get(
    '/api/orders/:id',
    jwtMiddleware,
    orderController.getById.bind(orderController),
  )

  .put(
    '/api/orders/:id',
    jwtMiddleware,
    orderController.updateById.bind(orderController),
  )

  .get(
    '/api/clients/:id/orders',
    jwtMiddleware,
    orderController.getByClientId.bind(orderController),
  )

  .get(
    '/api/curiers/:id/orders',
    jwtMiddleware,
    orderController.getByCurierId.bind(orderController),
  )

  .get(
    '/api/requests',
    jwtMiddleware,
    orderController.getRequests.bind(orderController),
  );

module.exports = router;
