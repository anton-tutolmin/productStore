const AuthService = require('../sevices/tokenService');

const AuthController = {

  login: async (ctx, next) => {
    await AuthService.login(ctx, next);
  },

  register: async (ctx, next) => {
    await AuthService.register(ctx, next);
  },

  profile: async (ctx, next) => {
    await AuthService.profile(ctx, next);
  }

}

module.exports = AuthController;