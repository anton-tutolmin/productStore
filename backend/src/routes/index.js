const KoaRouter = require('koa-router');

const UserRouter = require('./userRouter');
const AuthRouter = require('./authRouter');
const ProductRouter = require('./productRouter');
const OrderRouter = require('./orderRouter');

const router = new KoaRouter();

router.use(
  UserRouter.routes(),
  AuthRouter.routes(),
  ProductRouter.routes(),
  OrderRouter.routes()
);


module.exports = router;