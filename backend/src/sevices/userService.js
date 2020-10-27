const { UserDto } = require('../dto/userDto');

class UserService {
  constructor(userResource, validationService, hashService) {
    this.userResource = userResource;
    this.validationService = validationService;
    this.hashService = hashService;
  }

  async getById(userId) {
    const user = await this.userResource.getById(userId);
    return user ? new UserDto(user) : null;
  }

  async getAll() {
    const users = await this.userResource.getAll();
    return users.map((u) => new UserDto(u));
  }

  async getByUsername(username) {
    const user = await this.userResource.getByUsername(username);
    return user;
  }

  async deleteById(userId) {
    await this.userResource.deleteById(userId);
  }
}

module.exports = {
  UserService,
};
