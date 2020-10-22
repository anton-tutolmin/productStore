const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Bcrypt = require('../bcrypt');
const keys = require('./keys');

const { clientService } = require('../../sevices/clientService');

const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwtKey,
};

const LocalOptions = {
  username: 'username',
  password: 'password',
  session: false,
};

passport.use(
  'register',
  new LocalStrategy(LocalOptions, async (username, password, done) => {
    const user = await clientService.getByUsername(username);
    if (user) {
      return done(null, false, {
        message: 'This username already been taken',
      });
    } else {
      const hashedPassword = await Bcrypt.hashPassword(password);
      return done(null, {
        username: username,
        password: hashedPassword,
      });
    }
  }),
);

passport.use(
  'login',
  new LocalStrategy(LocalOptions, async (username, password, done) => {
    const user = await clientService.getByUsername(username);

    if (!user) {
      return done(null, false, {
        message: 'There is no user with this username',
      });
    } else {
      const isValidPassword = await Bcrypt.validatePassword(
        password,
        user.password,
      );
      if (!isValidPassword) {
        return done(null, false, { message: 'Wrong password' });
      } else {
        return done(null, user);
      }
    }
  }),
);

passport.use(
  'jwt',
  new JwtStrategy(JwtOptions, async (data, done) => {
    const user = await clientService.getById(data.id);
    if (!user) {
      return done(null, false, { message: 'There is no such user' });
    }
    return done(null, user);
  }),
);

module.exports = passport;
