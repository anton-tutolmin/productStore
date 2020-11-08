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
    '/api/users/:id/orders',
    jwtMiddleware,
    orderController.getByUserId.bind(orderController),
  )

  .get(
    '/api/requests',
    jwtMiddleware,
    orderController.getRequests.bind(orderController),
  )

  .get(
    '/api/orders/:id/candidates',
    orderController.getCandidantesByOrderId.bind(orderController),
  )

  .post(
    '/api/orders/:id/candidates',
    jwtMiddleware,
    orderController.setCandidate.bind(orderController),
  )

  .put(
    '/api/orders/:id/candidates',
    jwtMiddleware,
    orderController.pickCandidate.bind(orderController),
  );

module.exports = router;
