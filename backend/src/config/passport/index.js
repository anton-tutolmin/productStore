const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const bcrypt = require('bcrypt');

const UserService = require('../../sevices/user');

const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
};

const LocalOptions = {
  username: 'username',
  password: 'password',
  session: false
};

passport.use('register', new LocalStrategy(
  LocalOptions,
  async (username, password, done) => {
    const user = await UserService.getUserByUsername(username);

    if (user) {
      done(null, false, {message: 'This username already been taken'});
    } else {
      const salt = await bcrypt.genSalt(Number.parseInt(process.env.SALT_ROUNDS));

      const hashPassword = await bcrypt.hash(password, salt);

      done(null, {username: username, password: hashPassword});
    }
  }
));

passport.use('login', new LocalStrategy(
  LocalOptions,
  async (username, password, done) => {
    const user = await UserService.getUserByUsername(username);

    if (!user) {
      done(null, false, {message: 'There is no user with this username'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      done(null, false, {message: 'Wrong password'});
    } else {
      done(null, user);
    }
  }
));

passport.use('jwt', new JwtStrategy(JwtOptions, async (data, done) => {
  const user = await UserService.getUserById(data.id);
  if (!user) {
    done(null, false, {message: 'There is no such user'});
  }

  done(null, user);
}));

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserService.getUserById(id);
  done(null, user)
});

module.exports = passport;