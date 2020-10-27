const KoaRouter = require('koa-router');
const { authController } = require('../controllers/authController');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');

const router = new KoaRouter();

router
  .get(
    '/api/profile',
    jwtMiddleware,
    authController.profile.bind(authController),
  )

  .post('/api/login', authController.login.bind(authController))

  .post('/api/register', authController.register.bind(authController));

module.exports = router;
