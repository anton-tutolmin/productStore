const KoaRouter = require('koa-router');
const UserController = require('../controllers/userController');
const router = new KoaRouter();

router
  // Get all users
  .get('/api/users', async (ctx, next) => {
    const users = await UserController.getAll();
    ctx.response.body = {users};
  })

  // Get user by id
  .get('/api/users/:id', async (ctx, next) => {
    const user = await UserController.getById(ctx.params.id);
    ctx.response.body = {user};
  })

  // Update user by id
  .put('/api/users/:id', async (ctx, next) => {
    const user = await UserController.updateById(ctx.params.id, ctx.request.body);
    ctx.response.body = {user}
  })

  // Delete user by id
  .delete('/api/users/:id', async (ctx, next) => {
    await UserController.deleteById(ctx.params.id);
    ctx.response.body = {message: 'User deleted'};
  })

module.exports = router;