const KoaRouter = require('koa-router');
const { clientController } = require('../controllers/clientController');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');

const router = new KoaRouter();

router
  .get('/api/clients', clientController.getAll.bind(clientController))

  .get('/api/clients/:id', clientController.getById.bind(clientController))

  .put(
    '/api/clients/:id',
    jwtMiddleware,
    clientController.updateById.bind(clientController),
  )

  .delete(
    '/api/clients/:id',
    jwtMiddleware,
    clientController.deleteById.bind(clientController),
  );

module.exports = router;
