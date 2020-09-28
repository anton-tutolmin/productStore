const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Bcrypt = require('../bcrypt');
const keys = require('./keys');

const UserService = require('../../sevices/userService');

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
  new LocalStrategy(
    LocalOptions,
    async (username, password, done) => {
      const user = await UserService.getByUsername(username);
      if (user) {
        done(null, false, {
          message: 'This username already been taken',
        });
      } else {
        const hashedPassword = await Bcrypt.hashPassword(password);
        done(null, { username: username, password: hashedPassword });
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    LocalOptions,
    async (username, password, done) => {
      const user = await UserService.getByUsername(username);

      if (!user) {
        done(null, false, {
          message: 'There is no user with this username',
        });
      } else {
        const isValidPassword = await Bcrypt.validatePassword(
          password,
          user.password,
        );
        if (!isValidPassword) {
          done(null, false, { message: 'Wrong password' });
        } else {
          done(null, user);
        }
      }
    },
  ),
);

passport.use(
  'jwt',
  new JwtStrategy(JwtOptions, async (data, done) => {
    const user = await UserService.getById(data.id);
    if (!user) {
      done(null, false, { message: 'There is no such user' });
    }
    done(null, user);
  }),
);

module.exports = passport;
