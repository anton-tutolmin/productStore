const KoaRouter = require('koa-router');
const { clientController } = require('../controllers/clientController');
const OrderController = require('../controllers/ordersController');
const passport = require('../config/passport');
const isAllowed = require('./allow');

const router = new KoaRouter();

router
  .get('/api/clients', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        isAllowed(err, user, msg);
        const users = await clientController.getAll();
        ctx.response.body = { users };
      },
    )(ctx, next);
  })

  .get('/api/clients/:id', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, usr, msg) => {
        isAllowed(err, usr, msg, ctx.params.id);
        const user = await clientController.getById(ctx.params.id);
        ctx.response.body = { user };
      },
    )(ctx, next);
  })

  .put('/api/clients/:id', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        isAllowed(err, user, msg, ctx.params.id);

        await clientController.updateById(ctx.params.id, ctx.request.body);

        ctx.response.body = { message: 'User updated' };
      },
    )(ctx, next);
  })

  .delete('/api/clients/:id', async (ctx, next) => {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, msg) => {
        isAllowed(err, user, msg, ctx.params.id);
        await clientController.deleteById(ctx.params.id);
        await OrderController.deleteByClientId(ctx.params.id);
        ctx.response.body = { message: 'User deleted' };
      },
    )(ctx, next);
  });

module.exports = router;
