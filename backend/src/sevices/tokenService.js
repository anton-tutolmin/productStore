const jwt = require('jsonwebtoken');
const { clientService } = require('./clientService');
const { curierService } = require('./curierService');

const { jwtKey } = require('../config/passport/keys');

class TokenService {
  constructor(clientService, curierService, jwt) {
    this.clientService = clientService;
    this.curierService = curierService;
    this.jwt = jwt;
  }

  async login(requestBody) {
    let user = await this.clientService.getByUsername(requestBody.username);

    if (!user) {
      user = await this.curierService.getByUsername(requestBody.username);
    }

    if (!user) {
      return { error: 'Wrong username' };
    }

    if (requestBody.password !== user.password) {
      return { error: 'Wrong password' };
    }

    return this.jwt.sign({ id: user.id }, jwtKey);
  }

  async register(requestBody) {
    const user =
      requestBody.type === 'client'
        ? await this.clientService.create(requestBody)
        : await this.curierService.create(requestBody);

    return this.jwt.sign({ id: user.id }, jwtKey);
  }
}

module.exports = {
  TokenService,
  tokenService: new TokenService(clientService, curierService, jwt),
};
