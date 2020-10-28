const KoaRouter = require('koa-router');
const { curierController } = require('../controllers/curierController');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');

const router = new KoaRouter();

router
  .get('/api/curiers', curierController.getAll.bind(curierController))

  .get('/api/curiers/:id', curierController.getById.bind(curierController))

  .post(
    '/api/curiers',
    jwtMiddleware,
    curierController.create.bind(curierController),
  )

  .put(
    '/api/curiers/:id',
    jwtMiddleware,
    curierController.updateById.bind(curierController),
  )

  .delete(
    '/api/curiers/:id',
    jwtMiddleware,
    curierController.deleteById.bind(curierController),
  );

module.exports = router;
