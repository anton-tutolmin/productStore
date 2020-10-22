const { UserService } = require('./userService');
const userValidator = require('./validatorService/user');
const CurierResource = require('../resources/curierResource');
const ratingResource = require('../resources/ratingResource');

class CurierService extends UserService {
  async updateById(id, body) {
    const params = {};
    for (const param of Object.keys(body)) {
      if (param === 'username') params.username = body[param];
      if (param === 'email') params.email = body[param];
      if (param === 'phone') params.phone = body[param];
      if (param === 'status') params.type = body[param];
      if (param === 'balance') {
        const curier = await this.curierResource.getById(id);
        params.balance =
          curier.balance + Number.parseInt(body[param]);
      }
    }

    this.validationService.validateUpdateBody(params);
    await this.userResource.updateById(id, params);
  }

  async getRating(curierId) {
    const ratings = await this.ratingResource.getByCurierId(curierId);
    return ratings.reduce((a, c) => a + c.rating, 0) / ratings.length;
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
    CurierResource,
    ratingResource,
    userValidator,
  ),
};
