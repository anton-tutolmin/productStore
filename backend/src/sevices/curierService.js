const { UserService } = require('./userService');

class CurierService extends UserService {
  async updateById(id, params) {}

  async getRating(curierId) {
    const ratings = await this.userResource.getById(curierId);
  }

  async setRating(curierId, rating) {}

  async addBalance(curierId, balance) {}
}

module.exports = {
  CurierService,
};
