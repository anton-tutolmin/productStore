function isValidUsername(username) {
  return username && username.length >= 6;
}

function isValidEmail(email) {
  return email && email.length >= 10;
}

function isValidPhone(phone) {
  return phone && phone.length === 12;
}

function isValidBalance(balance) {
  return balance && typeof +balance === 'number' && +balance > 0;
}

export default {
  isValidUsername,
  isValidEmail,
  isValidPhone,
  isValidBalance,
};
