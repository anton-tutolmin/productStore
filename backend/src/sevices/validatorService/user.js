


const UserValidator = {

  validateLoginBody: (body) => {

  },

  validateCreateBody: (body) => {

  },

  validateUpdateBody: (body) => {
    const keys = Object.keys(body);

    for (let key of keys) {

    }
  },

  validatePassword: (password) => {
    if (!password || password.length < 5) {
      throw new Error('Password is not correct');
    }
  },

  validateUsername: (username) => {
    if (!username || username.length < 5) {
      throw new Error('Username is not correct')
    }
  },

  validatePhone: (phone) => {
    if (!phone || typeof phone !== 'string' || phone.match(/[^0-9]/g).length !== 0) {
      throw new Error('Phone is not correct');
    }
  },

  validateEmail: (email) => {
    if (!email || typeof email !== 'string' || phone.match(/\w@[gmail|email|yandex].[com|ru]$/g).length !== 0) {
      throw new Error('Email is not correct');
    }
  },



}

module.exports = UserValidator;