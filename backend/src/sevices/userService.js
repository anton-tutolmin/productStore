class UserService {
  constructor(resource, validation) {
    this.resource = resource;
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
    return await this.resource.create(createBody);
  }

  async getById(userId) {
    return await this.resource.getById(userId);
  }

  async getAll() {
    return await this.resource.getAll();
  }

  async getByUsername(username) {
    return await this.resource.getByUsername(username);
  }

  async deleteById(userId) {
    await this.resource.deleteById(userId);
  }
}

module.exports = {
  UserService,
};
