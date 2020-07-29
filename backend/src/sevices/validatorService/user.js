
function validateLoginBody(body) {
  validateUsername(body.username);
  validatePassword(body.password)
}

function validateCreateBody(body) {
  validateUsername(body.username);
  validatePassword(body.password);
  validateEmail(body.email);
  validatePhone(body.phone);
}

function validateUpdateBody(body) {
  for (let param of Object.keys(body)) {
    if (param === 'username') {
      validateUsername(body[param]);
    }

    if (param === 'email') {
      validateEmail(body[param]);
    }

    if (param === 'phone') {
      validatePhone(body[param]);
    }
  }
}

function validatePassword(password) {
  if (
    !password ||
    password.length < 5 ||
    username.match(/[^A-Za-z0-9]/g)
  ) {
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

module.exports = {
  validateLoginBody,
  validateCreateBody,
  validateUpdateBody
};