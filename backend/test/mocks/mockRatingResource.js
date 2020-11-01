class MockRatingResource {
  constructor(ratings) {
    this.ratings = ratings;
  }

  add({ clientId, curierId, rating }) {
    this.ratings.push({ clientId, curierId, rating });
    return { clientId, curierId, rating };
  }

  getByCurierId(curierId) {
    return this.ratings.filter((r) => r.curierId === curierId);
  }

  getByClientId(clientId) {
    return this.ratings.filter((r) => r.clientId === clientId);
  }

  isExist(clientId, curierId) {
    return this.ratings.find(
      (r) => r.clientId === clientId && r.curierId === curierId,
    );
  }

  remove({ clientId, curierId }) {
    this.ratings = this.ratings.filter(
      (r) => r.clientId !== clientId && r.curierId !== curierId,
    );
  }
}

module.exports = {
  mockRatingResource: new MockRatingResource([]),
};
