const path = require('path');
const Koa = require('koa');
const KoaBody = require('koa-body');
const send = require('koa-send');
const serve = require('koa-static');

const passport = require('koa-passport');

const router = require('./routes');

const staticDir = path.resolve(__dirname, '..', '..', 'frontend', 'public')

const app = new Koa();
app.keys = ['secret'];

app.use(KoaBody());
app.use(passport.initialize());

app.use(async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    await next();
  } catch (e) {
    ctx.response.status = 200;
    ctx.response.body = {error: e.message};
  }
});

app.use(router.routes());

app.use(serve(staticDir));

app.use(async ctx => {
  await send(ctx, 'index.html', { root: staticDir })
});

module.exports = app;
