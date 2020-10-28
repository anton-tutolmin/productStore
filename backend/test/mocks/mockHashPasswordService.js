class MockHashPasswordService {
  async hashPassword(password) {
    return password;
  }

  async validatePassword(password, hashedPassword) {
    return true;
  }
}

module.exports = {
  mockHashPasswordService: new MockHashPasswordService(),
};
