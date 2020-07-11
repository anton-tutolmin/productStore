const KoaRouter = require('koa-router');
const jwt = require('jsonwebtoken');

const UserController = require('../controllers/user');
const router = new KoaRouter();

const passport = require('../config/passport');

router
  .get('/users', UserController.getAllUsers)

  .get('/users/profile', async (ctx, next) => {
    await passport.authenticate('jwt', {session: false}, (err, user, info) => {
      if (err) {
        throw new Error('Wrong authorized');
      }
      if (info !== undefined) {
        ctx.response.body = {...info};
      } else {
        ctx.response.body = {
          auth: true,
          username: user.username,
          email: user.email,
          phone: user.phone
        };
      }
    })(ctx, next);
  })

  .post('/users/login', async (ctx, next) => {
    await passport.authenticate('login', (err, user, info) => {
      if (err) {
        throw new Error('Wrong authorized');
      }
      if (info !== undefined) {
        ctx.response.body = {...info};
      } else {
        const token = jwt.sign({id: user._id}, process.env.JWT_KEY);
        ctx.response.body = {
          auth: true,
          token: token,
          message: 'User logined'
        };
      }
    })(ctx, next);
  })

  .post('/users/register', async (ctx, next) => {
    await passport.authenticate('register', async (err, user, info) => {
      if (err) {
        throw new Error('Wrong authorized');
      }
      if (info !== undefined) {
        console.log('tut')
        ctx.response.body = {...info};
      } else {
        console.log('i tut');
        const hashedUser = {
          username: user.username,
          password: user.password,
          email: ctx.request.body.email,
          phone: ctx.request.phone
        };

        const createdUser = await UserController.createUser(hashedUser);
        console.log(createdUser);
        const token = jwt.sign({id: createdUser._id}, process.env.JWT_KEY);

        ctx.response.body = {
          auth: true,
          token: token,
          message: 'User registered'
        };
      }
    })(ctx, next);
  })

  .get('/users:id', async (ctx, next) => {
    
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