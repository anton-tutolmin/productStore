class UserService {
  constructor(userResource, ratingResource, validation) {
    this.userResource = userResource;
    this.ratingResource = ratingResource;
    this.validation = validation;
  }

  async create(body) {
    const createBody = {
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      balance: 0,
    };

    this.validation.validateCreateBody(createBody);
    return await this.userResource.create(createBody);
  }

  async getById(userId) {
    return await this.userResource.getById(userId);
  }

  async getAll() {
    return await this.userResource.getAll();
  }

  async getByUsername(username) {
    return await this.userResource.getByUsername(username);
  }

  async deleteById(userId) {
    await this.userResource.deleteById(userId);
  }
}

module.exports = {
  UserService,
};
