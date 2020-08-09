const KoaRouter = require('koa-router');
const validator = require('../sevices/validatorService/user');

const UserController = require('../controllers/userController');
const router = new KoaRouter();

router
  .get('/api/users', async (ctx, next) => {
    const users = await UserController.getAllUsers();
    ctx.response.body = {users};
  })

  .get('/api/users/:id', async (ctx, next) => {
    const user = await UserController.getUserById(ctx.params.id);
    ctx.response.body = {user};
  })

  .put('/api/users/:id', validator.validateUpdateBody, async (ctx, next) => {
    const user = await UserController.updateUserById(ctx.params.id, ctx.request.body);
    ctx.response.body = {user}
  })

  .delete('/api/users/:id', async (ctx, next) => {
    await UserController.deleteUserById(ctx.params.id);
    ctx.response.body = {message: 'User deleted'};
  })

module.exports = router;