const KoaRouter = require('koa-router');
const { curierController } = require('../controllers/curierController');

const router = new KoaRouter();

router
  .get('/api/curiers', async (ctx) => {
    const curiers = await curierController.getAll();
    ctx.response.body = { curiers };
  })

  .get('/api/curiers/:id', async (ctx) => {
    const curier = await curierController.getById(ctx.params.id);
    ctx.response.body = { curier };
  })

  .post('/api/curiers', async (ctx) => {
    const curier = await curierController.create(ctx.request.body);
    ctx.response.body = { curier };
  })

  .put('/api/curiers/:id', async (ctx) => {
    await curierController.updateById(ctx.params.id, ctx.request.body);
    ctx.response.body = { message: 'User updated' };
  })

  .delete('/api/curiers/:id', async (ctx) => {
    await curierController.deleteById(ctx.params.id);
    ctx.response.body = { message: 'User deleted' };
  });

module.exports = router;
