const KoaRouter = require('koa-router');
const { productController } = require('../controllers/productController');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');

const router = new KoaRouter();

router

  .post(
    '/api/products',
    jwtMiddleware,
    productController.create.bind(productController),
  )

  .get('/api/products', productController.getAll.bind(productController))

  .get('/api/products:id', productController.getById.bind(productController))

  .put(
    '/api/products:id',
    jwtMiddleware,
    productController.updateById.bind(productController),
  )

  .delete(
    '/api/products:id',
    jwtMiddleware,
    productController.deleteById.bind(productController),
  );

module.exports = router;
