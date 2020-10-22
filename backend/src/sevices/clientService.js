const { UserService } = require('./userService');
const { clientMongoResource } = require('../resources/clientResource');
const clientValidator = require('./validatorService/user');
const ratingResource = require('../resources/ratingResource');

class ClientService extends UserService {
  async updateById(id, body) {
    const params = {};
    for (const param of Object.keys(body)) {
      if (param === 'username') params.username = body[param];
      if (param === 'email') params.email = body[param];
      if (param === 'phone') params.phone = body[param];
      if (param === 'type') params.type = body[param];
      if (param === 'balance') {
        const client = await this.clientResource.getById(id);
        params.balance = client.balance + body[param];
      }
    }

    this.validationService.validateUpdateBody(params);
    await this.userResource.updateById(id, params);
  }

  async addBalance(id, coast) {
    const client = await this.userResource.getById(id);
    const balance = client.balance + +coast;
    await this.userResource.updateById(id, { balance });
  }

  async reduceBalance(id, coast) {
    const client = await this.userResource.getById(id);
    const balance = client.balance - coast;
    await this.userResource.updateById(id, { balance });
  }
}

module.exports = {
  ClientService,
  clientService: new ClientService(
    clientMongoResource,
    ratingResource,
    clientValidator,
  ),
};
