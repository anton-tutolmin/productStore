const { curierMongoResource } = require('../resources/curierResource');
const { clientMongoResource } = require('../resources/clientResource');

class UserCheckerService {
  constructor(clientResource, curierResource) {
    this.clientResource = clientResource;
    this.curierResource = curierResource;
  }

  async checkIfClientExists(clientId) {
    return await this.clientResource.isExist(clientId);
  }

  async checkIfCurierExists(curierId) {
    return await this.curierResource.isExist(curierId);
  }
}

module.exports = {
  UserCheckerService,
  userCheckerService: new UserCheckerService(
    clientMongoResource,
    curierMongoResource,
  ),
};
