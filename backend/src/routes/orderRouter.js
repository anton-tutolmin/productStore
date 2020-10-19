const KoaRouter = require('koa-router');
const OrderController = require('../controllers/ordersController');
const passport = require('../config/passport');
const errors = require('../errors/errors');

const router = new KoaRouter();

router

  .post('/api/orders', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        if (err) throw new Error(err);

        if (msg) throw new Error(msg.message);

        await OrderController.create(ctx.request.body, user);

        ctx.cache.removeOrder(user._id + '');
        ctx.cache.addProductCount(ctx.request.body.productId);
        ctx.response.body = { message: 'Order created' };
      },
    )(ctx, next);
  })

  .get('/api/orders/:id', async (ctx, next) => {
    const order = await OrderController.getById(ctx.params.id);
    ctx.response.body = { order };
  })

  .put('/api/orders/:id', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        if (err) throw new Error(err);

        if (msg) throw new Error(msg.message);

        await OrderController.updateById(
          ctx.params.id,
          ctx.request.body,
          user,
        );

        const updatedOrder = await OrderController.getById(
          ctx.params.id,
        );
        user.testMethod(() => console.log('hello'));
        ctx.cache.removeOrder(updatedOrder.clientId);
        ctx.cache.removeOrder(updatedOrder.curierId);
        ctx.response.body = { message: 'Order updated' };
      },
    )(ctx, next);
  })

  .get('/api/users/:id/orders', async (ctx, next) => {
    const userId = ctx.params.id;
    const cachedOrders = ctx.cache.getOrder(userId);
    if (cachedOrders) {
      ctx.response.body = { orders: cachedOrders };
    } else {
      const orders = await OrderController.getByUserId(userId);
      ctx.cache.setOrder(userId, orders);
      ctx.response.body = { orders };
    }
  })

  .get('/api/requests', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        if (err) throw new Error(err);

        if (msg) throw new Error(msg.message);

        if (user.type !== 2) throw new Error(errors.notCurier);

        const requests = await OrderController.getRequests();

        ctx.response.body = { requests };
      },
    )(ctx, next);
  });

module.exports = router;
