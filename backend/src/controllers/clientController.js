const { clientService } = require('../sevices/clientService');

class ClientController {
  constructor(clientService) {
    this.clientService = clientService;
  }

  async create(body) {
    return await this.clientService.create(body);
  }

  async getAll() {
    return await this.clientService.getAll();
  }

  async getById(id) {
    return await this.clientService.getById(id);
  }

  async updateById(id, params) {
    await this.clientService.updateById(id, params);
  }

  async deleteById(id) {
    await this.clientService.deleteById(id);
  }
}

module.exports = {
  ClientController,
  clientController: new ClientController(clientService),
};
