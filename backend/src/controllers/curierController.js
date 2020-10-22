const { curierService } = require('../sevices/curierService');

class CurierController {
  constructor(curierService) {
    this.curierService = curierService;
  }

  async create(body) {
    return await this.curierService.create(body);
  }

  async getAll() {
    return await this.curierService.getAll();
  }

  async getById(id) {
    return await this.curierService.getById(id);
  }

  async updateById(id, params) {
    await this.curierService.updateById(id, params);
  }

  async deleteById(id) {
    await this.curierService.deleteById(id);
  }
}

module.exports = {
  CurierController,
  curierController: new CurierController(curierService),
};
