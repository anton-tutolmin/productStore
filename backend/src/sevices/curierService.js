const { UserService } = require('./userService');
const { userValidationService } = require('./userValidationService');
const { curierMongoResource } = require('../resources/curierResource');
const { hashPasswordService } = require('./hashPasswordService');
const { UserDto } = require('../dto/userDto');
const { Curier } = require('../entities/curier');

class CurierService extends UserService {
  async create(requestBody) {
    const curier = new Curier(requestBody);

    this.validationService.validateCreateCurier(curier);

    curier.password = await this.hashService.hashPassword(curier.password);

    const createdCurier = await this.userResource.create(curier);
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
  curierService: new CurierService(
    curierMongoResource,
    userValidationService,
    hashPasswordService,
  ),
};
