const AuthService = require('../sevices/tokenService');

async function login(ctx, next) {
  await AuthService.login(ctx, next);
}

async function register(ctx, next) {
  await AuthService.register(ctx, next);
}

async function profile(ctx, next) {
  await AuthService.profile(ctx, next);
}

module.exports = {
  login,
  register,
  profile
};