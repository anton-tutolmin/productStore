class MockMongoose {
  constructor() {
    this.Types = {
      ObjectId: {
        isValid() {
          return true;
        },
      },
    };
  }
}

module.exports = {
  mockMongoose: new MockMongoose(),
};
