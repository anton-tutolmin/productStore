const KoaRouter = require('koa-router');

const UserRouter = require('./userRouter');
const AuthRouter = require('./authRouter');

const router = new KoaRouter();

router.use(
  UserRouter.routes(),
  AuthRouter.routes()
);


module.exports = router;