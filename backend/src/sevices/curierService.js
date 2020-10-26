const { UserService } = require('./userService');
const { userValidationService } = require('./userValidationService');
const { curierMongoResource } = require('../resources/curierResource');
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
  curierService: new CurierService(curierMongoResource, userValidationService),
};
