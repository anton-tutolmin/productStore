const { UserService } = require('./userService');
const { userValidationService } = require('./userValidationService');
const { curierMongoResource } = require('../resources/curierResource');
const { ratingMongoResource } = require('../resources/ratingResource');
const { UserDto } = require('../dto/userDto');

class CurierService extends UserService {
  async create(body) {
    const createBody = {
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      balance: 0,
      status: 'open',
    };

    this.validationService.validateCreateCurier(createBody);

    const createdCurier = await this.userResource.create(createBody);
    return new UserDto(createdCurier);
  }

  async updateById(id, body) {
    const params = {};
    for (const param of Object.keys(body)) {
      if (param === 'username') params.username = body[param];
      if (param === 'email') params.email = body[param];
      if (param === 'phone') params.phone = body[param];
      if (param === 'status') params.type = body[param];
      if (param === 'balance') params.balance = body[param];
    }

    this.validationService.validateUpdateBody(params);
    await this.userResource.updateById(id, params);
  }

  async getRating(curierId) {
    const ratings = await this.ratingResource.getByCurierId(curierId);
    return ratings.length > 0
      ? ratings.reduce((a, c) => a + c.rating, 0) / ratings.length
      : 0;
  }

  async addBalance(curierId, balance) {
    const curier = await this.userResource.getById(curierId);
    const newBalance = curier.balance + balance;
    await this.userResource.updateById(curierId, {
      balance: newBalance,
    });
  }
}

module.exports = {
  CurierService,
  curierService: new CurierService(
    curierMongoResource,
    ratingMongoResource,
    userValidationService,
  ),
};
