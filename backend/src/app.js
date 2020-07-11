const path = require('path');
const Koa = require('koa');
const KoaBody = require('koa-body');
const send = require('koa-send');
const serve = require('koa-static');
const mongoose = require('mongoose');

require('dotenv').config();
const PORT = process.env.PORT;
const url = process.env.URL;

const passport = require('koa-passport');

const router = require('./routes');

const staticDir = path.resolve(__dirname, '..', '..', 'frontend', 'public')

const app = new Koa();
app.keys = ['secret'];

app.use(KoaBody());
app.use(passport.initialize());

app.use(async (ctx, next) => {
  console.log('<<< IN <<<');
  try {
    await next();
  } catch (e) {
    ctx.response.body = {error: e.message};
  }
  console.log('<<< OUT <<<');
});

app.use(router.routes());

app.use(serve(staticDir));

app.use(async (ctx) => {
  await send(ctx, 'index.html', { root: staticDir })
});

async function start() {
  try {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(PORT, err => {
      if (err) {
        console.log('ERROR', err);
      } else {
        console.log('Server on port ' + PORT);
      }
    })
   
  } catch (err) {
    console.log(err);
  }

}

start();
