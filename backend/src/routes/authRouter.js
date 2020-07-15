const KoaRouter = require('koa-router');
const AuthController = require('../controllers/authController');

const router = new KoaRouter();

router
  .get('/profile', AuthController.profile)
  
  .post('/login', AuthController.login)
  
  .post('/register', AuthController.register)

module.exports = router;