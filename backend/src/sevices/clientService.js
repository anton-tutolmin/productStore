const { UserService } = require('./userService');
const ClientResource = require('../resources/clientResource');
const userValidator = require('./validatorService/user');

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
    await this.clientResource.updateById(id, params);
  }

  async addBalance(id, coast) {
    const client = await this.clientResource.getById(id);
    const balance = client.balance + +coast;
    await this.clientResource.updateById(id, { balance });
  }

  async reduceBalance(id, coast) {
    const client = await this.clientResource.getById(id);
    const balance = client.balance - coast;
    await this.clientResource.updateById(id, { balance });
  }
}

module.exports = {
  ClientService,
  clientService: new ClientService(ClientResource, userValidator),
};
