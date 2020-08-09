const KoaRouter = require('koa-router');
const AuthController = require('../controllers/authController');
const validator = require('../sevices/validatorService/user');

const router = new KoaRouter();

router
  .get('/api/profile', async (ctx, next) => {
    await AuthController.profile(ctx, next);
  })
  
  .post('/api/login', validator.validateLoginBody, async (ctx , next) => {
    await AuthController.login(ctx, next);
  })
  
  .post('/api/register', validator.validateCreateBody, async (ctx, next) => {
    await AuthController.register(ctx, next);
  })

module.exports = router;