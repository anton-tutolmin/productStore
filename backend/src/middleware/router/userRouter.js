const KoaRouter = require('koa-router');
const UserService = require('../../services/userService');

const router = new KoaRouter();

router
  .get('/users', async (ctx, next) => {
    const users = await UserService.getAll();
    ctx.response.body = { users };
  })

  .get('/users/profile', async (ctx, next) => {
    const userProfile = await UserService.getProfile(ctx.session.id);
    ctx.response.body = { userProfile };
  })

  .post('/users/login', async (ctx, next) => {
    await UserService.login(JSON.parse(ctx.request.body));
    ctx.response.body = { message: 'ok' };
  })

  .post('/users/register', async (ctx, next) => {
    await UserService.register(JSON.parse(ctx.request.body));
    ctx.response.body = { message: 'ok' }
  })

  .get('/users:id', async (ctx, next) => {
    const user = await UserService.getById(ctx.params.id);
    ctx.response.body = { user };
  })

  .put('/users:id', async (ctx, next) => {
    await UserService.updateById(
      ctx.params.id,
      JSON.parse(ctx.request.body)
    );
    ctx.response.body = { message: 'ok' };
  })

  .delete('/users:id', async (ctx, next) => {
    await UserService.deleteById(ctx.params.id);
    ctx.response.body = { message: 'ok' };
  })

module.exports = router;