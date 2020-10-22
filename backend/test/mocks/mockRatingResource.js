class MockRatingResource {
  constructor(ratings) {
    this.ratings = ratings;
  }

  add(clientId, curierId, rating) {
    this.ratings.push({ clientId, curierId, rating });
  }

  remove(clientId, curierId) {
    this.ratings = this.ratings.filter(
      (r) => r.clientId !== clientId && r.curierId !== curierId,
    );
  }
}

module.exports = {
  mockRatingResource: new MockRatingResource([]),
};
