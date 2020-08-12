
async function validateLoginBody(ctx, next) {
  const body = {...ctx.request.body};
  validateUsername(body.username);
  validatePassword(body.password);
  await next();
}

function validateCreateBody(body) {
  validateUsername(body.username);
  validatePassword(body.password);
  validateEmail(body.email);
  validatePhone(body.phone);
  validateType(body.type);
}

function validateUpdateBody(params) {
  for (let param of Object.keys(params)) {
    if (param === 'username') {
      validateUsername(params[param]);
    }

    if (param === 'email') {
      validateEmail(params[param]);
    }

    if (param === 'phone') {
      validatePhone(params[param]);
    }

    if (param === 'type') {
      validateType(params[param]);
    }
  }
}

function validatePassword(password) {
  if (!password || password.length === 0) {
    throw new Error('Password is not correct');
  }
}

function validateUsername(username) {
  if (!username || username.length < 5 || username.match(/[^\w]/g)) {
    throw new Error('Username is not correct')
  }
}

function validatePhone(phone) {
  if (
    !phone ||
    typeof phone !== 'string' ||
    phone.length !== 11 ||
    phone.match(/[^0-9]/g)
  ) {
    throw new Error('Phone is not correct');
  }
}

function validateEmail(email) {
  if (
    !email ||
    typeof email !== 'string' ||
    !email.match(/\w{5,}@(gmail|yandex).(ru|com)/g)
  ) {
    throw new Error('Email is not correct');
  }
}

function validateType(type) {
  if (
    !type ||
    type !== 1 &&
    type !== 2
  ) {
    throw new Error('Type is not correct');
  }
}

module.exports = {
  validateLoginBody,
  validateCreateBody,
  validateUpdateBody
};