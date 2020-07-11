const KoaRouter = require('koa-router');
const AuthController = require('../controllers/auth');

const router = new KoaRouter();

router
  .get('/users/profile', AuthController.profile)
  
  .post('/users/login', AuthController.login)
  
  .post('/users/register', AuthController.register)

module.exports = router;