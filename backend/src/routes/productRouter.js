const KoaRouter = require('koa-router');
const ProductController = require('../controllers/productController');

const router = new KoaRouter();

router
  // Add new products
  .post('/products', async (ctx, next) => {
    await ProductController.create(ctx.request.body.product);

    ctx.response.body = {message: 'Product created'}
  })

  // Get all available products
  .get('/products', async (ctx, next) => {
    const products = await ProductController.getAll();
    ctx.response.body = {products};
  })

  // Get information about products
  .get('/products:id', async (ctx, next) => {
    const product =
      await ProductController.getById(ctx.params.id);

    ctx.response.body = {product};
  })

  // Update products
  .put('/products:id', async (ctx, next) => {
    await ProductController
      .updateById(ctx.params.id, ctx.request.body);

    ctx.response.body = {message: 'Product updated'}
  })

  // Remove product
  .delete('/products:id', async (ctx, next) => {
    await ProductController.deleteById(ctx.params.id);
    ctx.response.body = {message: 'Product deleted'};
  })

module.exports = router;