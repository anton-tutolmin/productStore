class MockRatingSchema {
  constructor(ratings) {
    this.ratings = ratings;
  }

  create(params) {
    this.ratings.push({ ...params });
    return { ...params };
  }

  findAll(params) {
    return this.ratings.filter((r) => this.isCompatible(r, params));
  }

  exists(params) {
    return !!this.ratings.find((r) => this.isCompatible(r, params));
  }

  deleteOne(params) {
    this.ratings = this.ratings.filter((r) => !this.isCompatible(r, params));
  }

  isCompatible(rating, params) {
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; ++i) {
      if (rating[keys[i]] !== params[keys[i]]) {
        return false;
      }
    }
    return true;
  }
}

module.exports = {
  mockRatingSchema: new MockRatingSchema([]),
};
