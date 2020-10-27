const jwt = require('jsonwebtoken');
const { clientService } = require('./clientService');
const { curierService } = require('./curierService');
const { hashPasswordService } = require('./hashPasswordService');

const { jwtKey } = require('../config/jwtKey');

class TokenService {
  constructor(clientService, curierService, hashService, jwt) {
    this.clientService = clientService;
    this.curierService = curierService;
    this.hashService = hashService;
    this.jwt = jwt;
  }

  async login(requestBody) {
    let user = await this.clientService.getByUsername(requestBody.username);
    let type = 'client';

    if (!user) {
      user = await this.curierService.getByUsername(requestBody.username);
      type = 'curier';
    }

    if (!user) {
      return { error: 'Wrong username' };
    }

    const isValidPassword = await this.hashService.validatePassword(
      requestBody.password,
      user.password,
    );

    if (isValidPassword) {
      return { error: 'Wrong password' };
    }

    return this.jwt.sign({ id: user.id, type }, jwtKey);
  }

  async register(requestBody) {
    if (requestBody.type !== 'client' && requestBody.type !== 'curier') {
      return { error: 'Wrong user type' };
    }

    const user =
      requestBody.type === 'client'
        ? await this.clientService.create(requestBody)
        : await this.curierService.create(requestBody);

    return this.jwt.sign({ id: user.id, type: requestBody.type }, jwtKey);
  }
}

module.exports = {
  TokenService,
  tokenService: new TokenService(
    clientService,
    curierService,
    hashPasswordService,
    jwt,
  ),
};
