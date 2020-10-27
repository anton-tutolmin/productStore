const { tokenService } = require('../sevices/tokenService');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(ctx, next) {
    const token = await this.authService.login(ctx.request.body);
    ctx.response.body = { token };
  }

  async register(ctx, next) {
    const token = await this.authService.register(ctx.request.body);
    ctx.response.body = { token };
  }

  async profile(ctx, next) {
    ctx.response.body = { user: ctx.state.user };
  }
}

module.exports = {
  AuthController,
  authController: new AuthController(tokenService),
};
