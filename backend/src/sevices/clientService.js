const { UserService } = require('./userService');
const { clientMongoResource } = require('../resources/clientResource');
const { userValidationService } = require('./userValidationService');
const { UserDto } = require('../dto/userDto');
const { Client } = require('../entities/client');

class ClientService extends UserService {
  async create(requestBody) {
    const client = new Client(requestBody);

    this.validationService.validateCreateClient(client);

    const createdClient = await this.userResource.create(client);
    return new UserDto(createdClient);
  }

  async updateById(id, requestBody) {
    const params = {};
    for (const param of Object.keys(requestBody)) {
      if (param === 'username') params.username = requestBody[param];
      if (param === 'email') params.email = requestBody[param];
      if (param === 'phone') params.phone = requestBody[param];
      if (param === 'balance') params.balance = requestBody[param];
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
  clientService: new ClientService(clientMongoResource, userValidationService),
};
