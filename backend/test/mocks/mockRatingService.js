class MockRatingService {
  constructor(ratings) {
    this.ratings = ratings;
  }

  addRating(requestBody) {
    this.ratings.push({ ...requestBody });
    return { ...requestBody };
  }

  removeRating(requestBody) {
    this.ratings = this.ratings.filter(
      (r) => r.clientId !== requestBody.clientId,
    );
  }

  getRatingsByClientId(clientId) {
    return this.ratings.filter((r) => r.clientId === clientId);
  }

  getRatingsByCurierId(curierId) {
    return this.ratings.filter((r) => r.curierId === curierId);
  }

  getCurierRating(curierId) {
    const ratings = this.ratings.filter((r) => r.curierId === curierId);
    return ratings.reduce((a, c) => a + c.rating, 0) / ratings.length;
  }
}

module.exports = {
  mockRatingService: new MockRatingService([]),
};
