const KoaRouter = require('koa-router');
const AuthController = require('../controllers/authController');

const router = new KoaRouter();

router
  .get('/profile', async (ctx, next) => {
    await AuthController.profile(ctx, next);
  })
  
  .post('/login', async (ctx , next) => {
    await AuthController.login(ctx, next);
  })
  
  .post('/register', async (ctx, next) => {
    await AuthController.register(ctx, next);
  })

module.exports = router;