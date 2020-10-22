const { notCorrectPhone } = require('../../errors/errors');
const errors = require('../../errors/errors');

async function validateLoginBody(ctx, next) {
  const body = { ...ctx.request.body };
  validateUsername(body.username);
  validatePassword(body.password);
  await next();
}

function validateCreateBody(body) {
  validateUsername(body.username);
  validatePassword(body.password);
  validateEmail(body.email);
  validatePhone(body.phone);
}

function validateUpdateBody(params) {
  for (const param of Object.keys(params)) {
    if (param === 'username') validateUsername(params[param]);
    if (param === 'email') validateEmail(params[param]);
    if (param === 'phone') validatePhone(params[param]);
    if (param === 'balance') validateBalance(params[param]);
  }
}

function validatePassword(password) {
  if (!password || password.length === 0) {
    throw new Error(errors.notCorrectPassword);
  }
}

function validateUsername(username) {
  if (!username || username.length < 5 || username.match(/[^\w]/g)) {
    throw new Error(errors.notCorrectUsername);
  }
}

function validatePhone(phone) {
  if (
    !phone ||
    typeof phone !== 'string' ||
    phone.length !== 11 ||
    phone.match(/[^0-9]/g)
  ) {
    throw new Error(notCorrectPhone);
  }
}

function validateEmail(email) {
  if (
    !email ||
    typeof email !== 'string' ||
    !email.match(/\w{5,}@(gmail|yandex).(ru|com)/g)
  ) {
    throw new Error(errors.notCorrectEmail);
  }
}

function validateBalance(balance) {
  if (!balance || typeof balance !== 'number' || balance < 0) {
    throw new Error(errors.notCorrectBalance);
  }
}

module.exports = {
  validateLoginBody,
  validateCreateBody,
  validateUpdateBody,
};
