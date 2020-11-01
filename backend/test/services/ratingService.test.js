const { RatingService } = require('../../src/sevices/ratingService');
const {
  mockRatingValidationService,
} = require('../mocks/mockRatingValidationService');
const { mockRatingResource } = require('../mocks/mockRatingResource');

const ratingService = new RatingService(
  mockRatingResource,
  mockRatingValidationService,
);

describe('Test rating service', () => {
  it('add rating', async () => {
    const rating = await ratingService.addRating({
      clientId: 1,
      curierId: 1,
      rating: 5,
    });

    expect(rating.clientId).toBe(1);
    expect(rating.curierId).toBe(1);
    expect(rating.rating).toBe(5);
  });

  it('get ratings by client id', async () => {
    const ratings = await ratingService.getRatingsByClientId(1);

    expect(ratings.length).toBe(1);
    expect(ratings[0].clientId).toBe(1);
    expect(ratings[0].curierId).toBe(1);
    expect(ratings[0].rating).toBe(5);
  });

  it('get ratings by curier id', async () => {
    const ratings = await ratingService.getRatingsByCurierId(1);

    expect(ratings.length).toBe(1);
    expect(ratings[0].clientId).toBe(1);
    expect(ratings[0].curierId).toBe(1);
    expect(ratings[0].rating).toBe(5);
  });

  it('get curier rating by id', async () => {
    const rating = await ratingService.getCurierRating(1);

    expect(rating).toBe(5);
  });

  it('delete rating', async () => {
    await ratingService.removeRating({ clientId: 1, curierId: 1 });
    const ratings = await ratingService.getRatingsByClientId(1);

    expect(ratings.length).toBe(0);
  });
});
