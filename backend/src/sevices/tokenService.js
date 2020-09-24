const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const UserService = require('./userService');

const key = require('../config/passport/keys').jwtKey;


async function login(ctx, next) {
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
      };
    }
  })(ctx, next);
}

async function register(ctx, next) {
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
        phone: ctx.request.body.phone,
        type: ctx.request.body.type
      };
      
      const createdUser = await UserService.create(hashedUser);
      const token = jwt.sign({id: createdUser._id}, key);
      ctx.response.body = {
        auth: true,
        token: token,
      };
    }
  })(ctx, next);
}

async function profile(ctx, next) {
  await passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err) {
      throw new Error('Wrong authorized');
    }
    if (info !== undefined) {
      ctx.response.body = {...info};
    } else {
      ctx.response.body = {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
        type: user.type
      };
    }
  })(ctx, next);
}

module.exports = {
  login,
  register,
  profile
};