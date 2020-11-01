const KoaRouter = require('koa-router');

const ClientRouter = require('./clientRouter');
const CurierRouter = require('./curierRouter');
const AuthRouter = require('./authRouter');
const ProductRouter = require('./productRouter');
const OrderRouter = require('./orderRouter');
const RatingRouter = require('./ratingRouter');

const router = new KoaRouter();

router.use(
  ClientRouter.routes(),
  CurierRouter.routes(),
  AuthRouter.routes(),
  ProductRouter.routes(),
  OrderRouter.routes(),
  RatingRouter.routes(),
);

module.exports = router;
