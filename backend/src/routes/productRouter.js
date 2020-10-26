const KoaRouter = require('koa-router');
const passport = require('../config/passport');
const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/ordersController');
const isAllowed = require('./allow');

const router = new KoaRouter();

router

  .post('/api/products', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        isAllowed(err, user, msg);
        await ProductController.create(ctx.request.body.product);
        ctx.response.body = { message: 'Product created' };
      },
    )(ctx, next);
  })

  .get('/api/products', async (ctx, next) => {
    const cachedProducts = ctx.cache.getProduct();
    if (cachedProducts) {
      ctx.response.body = { products: cachedProducts };
    } else {
      const products = await ProductController.getAll();
      ctx.cache.setProduct(products);
      ctx.response.body = { products };
    }
  })

  .get('/api/products:id', async (ctx, next) => {
    const product = await ProductController.getById(ctx.params.id);

    ctx.response.body = { product };
  })

  .put('/api/products:id', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        isAllowed(err, user, msg);

        await ProductController.updateById(ctx.params.id, ctx.request.body);

        ctx.cache.removeProduct();
        ctx.response.body = { message: 'Product updated' };
      },
    )(ctx, next);
  })

  .delete('/api/products:id', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        isAllowed(err, user, msg);
        await ProductController.deleteById(ctx.params.id);
        await OrderController.deleteByProductId(ctx.params.id);
        ctx.response.body = { message: 'Product deleted' };
      },
    )(ctx, next);
  });

module.exports = router;
