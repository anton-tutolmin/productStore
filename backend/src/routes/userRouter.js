const KoaRouter = require('koa-router');
const jwt = require('jsonwebtoken');

const UserController = require('../controllers/user');
const AuthController = require('../controllers/auth');
const router = new KoaRouter();

const passport = require('../config/passport');

router
  .get('/users', UserController.getAllUsers)

  .get('/users/:id', UserController.getUserById)

  .put('/users/:id', async (ctx, next) => {
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