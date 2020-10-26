const KoaRouter = require('koa-router');
const { ratingController } = require('../controllers/ratingController');

const router = new KoaRouter();

router

  .get(
    '/api/client/:id/ratings',
    ratingController.getRatingsByClientId.bind(ratingController),
  )

  .get(
    '/api/curier/:id/ratings',
    ratingController.getRatingsByCurierId.bind(ratingController),
  )

  .get(
    '/api/rating/:id',
    ratingController.getCurierRating.bind(ratingController),
  )

  .post('/api/rating', ratingController.addRating.bind(ratingController))

  .delete('/api/rating', ratingController.removeRating.bind(ratingController));

module.exports = router;
