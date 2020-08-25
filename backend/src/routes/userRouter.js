const KoaRouter = require('koa-router');
const UserController = require('../controllers/userController');
const OrderController = require('../controllers/ordersController');
const passport = require('../config/passport');
const router = new KoaRouter();

const isAllowed = require('./allow');

router
  .get('/api/users', async (ctx, next) => {
    await passport.authenticate('jwt', {session: false},
      async (err, user, msg) => {
        isAllowed(err, user, msg);
        const users = await UserController.getAll();
        ctx.response.body = {users};
      }
    )(ctx, next);
  })

  .get('/api/users/:id', async (ctx, next) => {
    await passport.authenticate('jwt', {session: false},
      async (err, usr, msg) => {
        isAllowed(err, usr, msg, ctx.params.id);
        const user = await UserController.getById(ctx.params.id);
        ctx.response.body = {user};
      }
    )(ctx, next);
  })

  .put('/api/users/:id', async (ctx, next) => {
    await passport.authenticate('jwt', {session: false},
      async (err, user, msg) => {
        isAllowed(err, user, msg, ctx.params.id);
        
        await UserController.updateById(
          ctx.params.id,
          ctx.request.body
        );

        ctx.response.body = {message: 'User updated'};
      }
    )(ctx, next);
  })

  .delete('/api/users/:id', async (ctx, next) => {
    await passport.authenticate('jwt', {session: false},
      async (err, user, msg) => {
        isAllowed(err, user, msg, ctx.params.id);
        await UserController.deleteById(ctx.params.id);
        await OrderController.deleteByClientId(ctx.params.id);
        ctx.response.body = {message: 'User deleted'};
      }
    )(ctx, next);
  });

module.exports = router;