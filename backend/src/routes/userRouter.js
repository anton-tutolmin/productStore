const KoaRouter = require('koa-router');
const UserController = require('../controllers/userController');
const OrderController = require('../controllers/ordersController');
const passport = require('../config/passport');
const router = new KoaRouter();

router

  .get('/api/users', async (ctx, next) => {
    await passport.authenticate('jwt', {session: false},
      (err, user, msg) => {
        if (err) throw new Error(err);

        if (msg) throw new Error(msg.message);

        if (user.type !== 3) {
          throw new Error('Get users info allowed only admin');
        }

        const users = await UserController.getAll();
        ctx.response.body = {users};
      }
    )(ctx, next);
  })


  .get('/api/users/:id', async (ctx, next) => {
    const user = await UserController.getById(ctx.params.id);
    ctx.response.body = {user};
  })


  .put('/api/users/:id', async (ctx, next) => {
    const user = await UserController.updateById(ctx.params.id, ctx.request.body);
    ctx.response.body = {user}
  })


  .delete('/api/users/:id', async (ctx, next) => {
    await UserController.deleteById(ctx.params.id);
    await OrderController.deleteByClientId(ctx.params.id);
    ctx.response.body = {message: 'User deleted'};
  })

module.exports = router;