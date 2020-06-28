const KoaRouter = require('koa-router');

const router = new KoaRouter();

router
  //get all available products
  .get('/products')

  //add new products
  .post('/products')

  //get information about products
  .get('/products:id')

  //update products
  .put('/products:id')

  //remove products
  .delete('/products:id')

module.exports = router;