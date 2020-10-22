const { UserDto } = require('../dto/userDto');

class UserService {
  constructor(userResource, ratingResource, validationService) {
    this.userResource = userResource;
    this.ratingResource = ratingResource;
    this.validationService = validationService;
  }

  async create(body) {
    const createBody = {
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      balance: 0,
    };

    this.validationService.validateCreateBody(createBody);

    const createdUser = await this.userResource.create(createBody);
    return new UserDto(createdUser);
  }

  async getById(userId) {
    const user = await this.userResource.getById(userId);
    return user ? new UserDto(user) : undefined;
  }

  async getAll() {
    const users = await this.userResource.getAll();
    return users.map((u) => new UserDto(u));
  }

  async getByUsername(username) {
    const user = await this.userResource.getByUsername(username);
    return new UserDto(user);
  }

  async deleteById(userId) {
    await this.userResource.deleteById(userId);
  }
}

module.exports = {
  UserService,
};
