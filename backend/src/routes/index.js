const KoaRouter = require('koa-router');

const UserRouter = require('./userRouter');

const router = new KoaRouter();

router.use(
  UserRouter.routes(),
);


module.exports = router;