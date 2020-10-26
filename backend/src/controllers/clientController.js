const { clientService } = require('../sevices/clientService');

class ClientController {
  constructor(clientService) {
    this.clientService = clientService;
  }

  async create(ctx, next) {
    const client = await this.clientService.create(ctx.request.body);
    ctx.response.body = { client };
  }

  async getAll(ctx, next) {
    const clients = await this.clientService.getAll();
    ctx.response.body = { clients };
  }

  async getById(ctx, next) {
    const client = await this.clientService.getById(ctx.params.id);
    ctx.response.body = { client };
  }

  async updateById(ctx, next) {
    await this.clientService.updateById(ctx.params.id, ctx.request.body);
    ctx.response.body = { message: 'User updated' };
  }

  async deleteById(ctx, next) {
    await this.clientService.deleteById(ctx.params.id);
    ctx.response.body = { message: 'User deleted' };
  }
}

module.exports = {
  ClientController,
  clientController: new ClientController(clientService),
};
