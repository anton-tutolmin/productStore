const { RatingMongoResource } = require('../../src/resources/ratingResource');
const { mockRatingSchema } = require('../mocks/mockRatingSchema');
const { mockMongoose } = require('../mocks/mockMongoose');

const ratingResource = new RatingMongoResource(mockRatingSchema, mockMongoose);

describe('Test rating resource', () => {
  it('add rating', async () => {
    const rating = { clientId: 1, curierId: 1, rating: 5 };
    const added = await ratingResource.add(rating);

    expect(added).toEqual(rating);
  });

  it('get ratings by curier id', async () => {
    const ratings = await ratingResource.getByCurierId(1);

    expect(ratings.length).toBe(1);
    expect(ratings[0].clientId).toBe(1);
    expect(ratings[0].curierId).toBe(1);
    expect(ratings[0].rating).toBe(5);
  });

  it('get ratings by client id', async () => {
    const ratings = await ratingResource.getByClientId(1);

    expect(ratings.length).toBe(1);
    expect(ratings[0].clientId).toBe(1);
    expect(ratings[0].curierId).toBe(1);
    expect(ratings[0].rating).toBe(5);
  });

  it('check if rating exists', async () => {
    const isExist = await ratingResource.isExist({ clientId: 1, curierId: 1 });

    expect(isExist).toBe(true);
  });

  it('remove rating', async () => {
    await ratingResource.remove({ clientId: 1, curierId: 1 });
    const ratings = await ratingResource.getByClientId(1);

    expect(ratings.length).toBe(0);
  });
});
