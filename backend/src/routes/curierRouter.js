const KoaRouter = require('koa-router');
const { curierController } = require('../controllers/curierController');

const router = new KoaRouter();

router
  .get('/api/curiers', curierController.getAll.bind(curierController))

  .get('/api/curiers/:id', curierController.getById.bind(curierController))

  .post('/api/curiers', curierController.create.bind(curierController))

  .put('/api/curiers/:id', curierController.updateById.bind(curierController))

  .delete(
    '/api/curiers/:id',
    curierController.deleteById.bind(curierController),
  );

module.exports = router;
