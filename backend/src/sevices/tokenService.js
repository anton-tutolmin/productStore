const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const UserService = require('./userService');

const key = require('../config/passport/keys').jwtKey;

const TokenService = {

  login: async (ctx, next) => {
    await passport.authenticate('login', (err, user, info) => {
      if (err) {
        throw new Error('Wrong authorized');
      }
      if (info !== undefined) {
        ctx.response.body = {...info};
      } else {
        const token = jwt.sign({id: user._id}, key);
        ctx.response.body = {
          auth: true,
          token: token,
          message: 'User logined'
        };
      }
    })(ctx, next);
  },

  register: async (ctx, next) => {
    await passport.authenticate('register', async (err, user, info) => {
      if (err) {
        throw new Error('Wrong authorized');
      }

      if (info !== undefined) {
        ctx.response.body = {...info};
      } else {
        const hashedUser = {
          username: user.username,
          password: user.password,
          email: ctx.request.body.email,
          phone: ctx.request.body.phone
        };

        const createdUser = await UserService.createUser(hashedUser);

        const token = jwt.sign({id: createdUser._id}, key);

        ctx.response.body = {
          auth: true,
          token: token,
          message: 'User registered'
        };
      }
    })(ctx, next);
  },

  profile: async (ctx, next) => {
    await passport.authenticate('jwt', {session: false}, (err, user, info) => {
      if (err) {
        throw new Error('Wrong authorized');
      }
      if (info !== undefined) {
        ctx.response.body = {...info};
      } else {
        ctx.response.body = {
          auth: true,
          username: user.username,
          email: user.email,
          phone: user.phone
        };
      }
    })(ctx, next);
  }

}

module.exports = TokenService;