const KoaRouter = require('koa-router');

const router = new KoaRouter();

router
  .get('/users')

  .get('/users/profile')

  .post('/users/login')

  .post('/users/register')

  .get('/users:id')

  .put('/users:id')

  .delete('/users:id')

module.exports = router;