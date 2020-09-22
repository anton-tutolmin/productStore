function isValidUsername(username) {
  return username && username.length >= 6;
}

function isValidPassword(password) {
  return password && password.length >= 6;
}

function isValidEmail(email) {
  return email && email.length >= 11;
}

function isValidPhone(phone) {
  return phone && phone.length === 11;
}

function isValidBalance(balance) {
  return balance && typeof +balance === 'number' && +balance > 0;
}

export default {
  isValidUsername,
  isValidPassword,
  isValidEmail,
  isValidPhone,
  isValidBalance,
};
