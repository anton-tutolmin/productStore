const ClientResource = require('../resources/clientResource');
const userValidator = require('./validatorService/user');

class ClientService {
  constructor(clientResource, validationService) {
    this.clientResource = clientResource;
    this.validationService = validationService;
  }

  async create(body) {
    const createBody = {
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
      balance: 0,
    };

    this.validationService.validateCreateBody(createBody);
    return await this.clientResource.create(createBody);
  }

  async getAll() {
    return await this.clientResource.getAll();
  }

  async getById(id) {
    return await this.clientResource.getById(id);
  }

  async getByUsername(username) {
    return await this.clientResource.getByUsername(username);
  }

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

  async deleteById(id) {
    await this.clientResource.deleteById(id);
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
