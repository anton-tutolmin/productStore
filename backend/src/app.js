const path = require('path');
const Koa = require('koa');
const KoaBody = require('koa-body');
const send = require('koa-send');
const serve = require('koa-static');

const PORT = 3000;

const staticDir = path.resolve(__dirname, '..', '..', 'frontend', 'public')

const app = new Koa(KoaBody());

app.use(async (ctx, next) => {
  console.log('<<< IN <<<');
  await next();
  console.log('<<< OUT <<<');
});

app.use(serve(staticDir));

app.use(async (ctx) => {
  await send(ctx, 'index.html', { root: staticDir })
});

app.listen(PORT, err => {
  if (err) {
    console.log('ERROR', err);
  } else {
    console.log('Server on port ' + PORT);
  }
})
