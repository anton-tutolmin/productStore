const { UserService } = require('./userService');

class CurierService extends UserService {
  async updateById(id, params) {}

  async getRating(curierId) {}

  async setRating(curierId, rating) {}
}

module.exports = {
  CurierService,
};
