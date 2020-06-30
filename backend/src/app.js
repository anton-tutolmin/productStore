const path = require('path');
const Koa = require('koa');
const KoaBody = require('koa-body');
const send = require('koa-send');
const serve = require('koa-static');
const mongoose = require('mongoose');

const User = require('./models/User');

const router = require('./middleware/router');

const PORT = 3000;
const url = 'mongodb+srv://Anton:12win4456@cluster0-z82da.mongodb.net/productStore';

const staticDir = path.resolve(__dirname, '..', '..', 'frontend', 'public')

const app = new Koa(KoaBody());

app.use(async (ctx, next) => {
  console.log('<<< IN <<<');
  await next();
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
