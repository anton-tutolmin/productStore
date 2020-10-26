const { RatingController } = require('../../src/controllers/ratingController');
const { mockRatingService } = require('../mocks/mockRatingService');

const ratingController = new RatingController(mockRatingService, {
  checkIfExist: () => false,
});

describe('Test rating controller', () => {
  it('create rating instace', async () => {
    const ctx = {
      request: { body: { clientId: 1, curierId: 1, rating: 5 } },
      response: {},
    };

    await ratingController.addRating(ctx, () => {});

    expect(ctx.response.body.message).toBe('Rating is added');
  });

  it('get cruier rating by id', async () => {
    const ctx = {
      params: { id: 1 },
      request: {},
      response: {},
    };

    await ratingController.getCurierRating(ctx, () => {});

    expect(ctx.response.body.rating).toBe(5);
  });

  it('get client ratings by id', async () => {
    const ctx = {
      params: { id: 1 },
      request: {},
      response: {},
    };

    await ratingController.getRatingsByClientId(ctx, () => {});

    expect(ctx.response.body.ratings.length).toBe(1);
    expect(ctx.response.body.ratings[0].clientId).toBe(1);
    expect(ctx.response.body.ratings[0].curierId).toBe(1);
    expect(ctx.response.body.ratings[0].rating).toBe(5);
  });

  it('get curier ratings by id', async () => {
    const ctx = {
      params: { id: 1 },
      request: {},
      response: {},
    };

    await ratingController.getRatingsByCurierId(ctx, () => {});

    expect(ctx.response.body.ratings.length).toBe(1);
    expect(ctx.response.body.ratings[0].clientId).toBe(1);
    expect(ctx.response.body.ratings[0].curierId).toBe(1);
    expect(ctx.response.body.ratings[0].rating).toBe(5);
  });

  it('delete rating', async () => {
    const ctx = {
      params: { id: 1 },
      request: { body: { clientId: 1, curierId: 1 } },
      response: {},
    };

    await ratingController.removeRating(ctx, () => {});

    expect(ctx.response.body.message).toBe('Rating is removed');

    await ratingController.getRatingsByClientId(ctx);

    expect(ctx.response.body.ratings.length).toBe(0);
  });

  it('added second rating', async () => {
    const ratingController = new RatingController(mockRatingService, {
      checkIfExist: () => true,
    });

    const ctx = {
      request: { body: { clientId: 1, curierId: 1, rating: 5 } },
      response: {},
    };

    await ratingController.addRating(ctx, () => {});

    expect(ctx.response.body.message).toBe('Rating already added');
  });
});
