const KoaRouter = require('koa-router');
const AuthController = require('../controllers/authController');

const router = new KoaRouter();

router
  .get('/api/profile', async (ctx, next) => {
    await AuthController.profile(ctx, next);
  })
  
  .post('/api/login', async (ctx , next) => {
    await AuthController.login(ctx, next);
  })
  
  .post('/api/register', async (ctx, next) => {
    await AuthController.register(ctx, next);
  })

module.exports = router;