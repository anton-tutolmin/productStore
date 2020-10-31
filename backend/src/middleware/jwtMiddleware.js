const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtKey } = require('../config/jwtKey');
const { clientService } = require('../sevices/clientService');
const { curierService } = require('../sevices/curierService');

const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey,
};

passport.use(
  'jwt',
  new JwtStrategy(JwtOptions, async (data, done) => {
    const user =
      data.type === 'client'
        ? await clientService.getById(data.id)
        : await curierService.getById(data.id);

    if (!user) {
      return done(null, false, { message: 'There is no such user' });
    }

    return done(null, { ...user, type: data.type });
  }),
);

module.exports = {
  jwtMiddleware: passport.authenticate('jwt', { session: false }),
};
