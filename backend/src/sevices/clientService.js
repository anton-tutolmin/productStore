const { UserService } = require('./userService');
const { clientMongoResource } = require('../resources/clientResource');
const { userValidationService } = require('./userValidationService');
const { ratingMongoResource } = require('../resources/ratingResource');
const { UserDto } = require('../dto/userDto');

class ClientService extends UserService {
  async create(body) {
    const createBody = {
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      balance: 0,
    };
    console.log(this.validationService);
    this.validationService.validateCreateClient(createBody);

    const createdClients = await this.userResource.create(createBody);
    return new UserDto(createdClients);
  }

  async updateById(id, body) {
    const params = {};
    for (const param of Object.keys(body)) {
      if (param === 'username') params.username = body[param];
      if (param === 'email') params.email = body[param];
      if (param === 'phone') params.phone = body[param];
      if (param === 'balance') params.balance = body.param;
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
    ratingMongoResource,
    userValidationService,
  ),
};
