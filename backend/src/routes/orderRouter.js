const KoaRouter = require('koa-router');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');

const router = new KoaRouter();

router

  .post('/api/orders')

  .get('/api/orders/:id')

  .put('/api/orders/:id', jwtMiddleware)

  .get('/api/users/:id/orders', jwtMiddleware)

  .get('/api/requests', jwtMiddleware);

module.exports = router;
