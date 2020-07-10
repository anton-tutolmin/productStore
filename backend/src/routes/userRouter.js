const KoaRouter = require('koa-router');
const UserController = require('../controllers/user');
const router = new KoaRouter();

router
  .get('/users', UserController.getAllUsers)

  .get('/users/profile', async (ctx, next) => {
    const userProfile = await UserController.getProfile(ctx.session.id);
    ctx.response.body = { userProfile };
  })

  .post('/users/login', async (ctx, next) => {
    await UserController.login(ctx.request.body);
    ctx.response.body = { message: 'ok' };
  })

  .post('/users/register', async (ctx, next) => {
    await UserController.register(ctx.request.body);
    ctx.response.body = { message: 'ok' }
  })

  .get('/users:id', async (ctx, next) => {
    const user = await UserController.getById(ctx.params.id);
    ctx.response.body = { user };
  })

  .put('/users:id', async (ctx, next) => {
    await UserController.updateById(
      ctx.params.id,
      ctx.request.body
    );
    ctx.response.body = { message: 'ok' };
  })

  .delete('/users:id', async (ctx, next) => {
    await UserController.deleteById(ctx.params.id);
    ctx.response.body = { message: 'ok' };
  })

module.exports = router;