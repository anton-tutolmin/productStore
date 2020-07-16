const KoaRouter = require('koa-router');

const UserController = require('../controllers/userController');
const router = new KoaRouter();

router
  .get('/users', async (ctx, next) => {
    const users = await UserController.getAllUsers();
    ctx.response.body = {users};
  })

  .get('/users/:id', async (ctx, next) => {
    const user = await UserController.getUserById(ctx.params.id);
    ctx.response.body = {user};
  })

  .put('/users/:id', async (ctx, next) => {
    await UserController.updateUserById(ctx.params.id);
    ctx.response.body = {message: 'User updated'}
  })

  .delete('/users/:id', async (ctx, next) => {
    await UserController.deleteUserById(ctx.params.id);
    ctx.response.body = {message: 'User deleted'};
  })

module.exports = router;