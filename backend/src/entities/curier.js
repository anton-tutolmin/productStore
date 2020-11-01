class Curier {
  constructor({ username, password, email, phone, balance, status }) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.balance = balance || 0;
    this.status = status || 'open';
  }
}

module.exports = {
  Curier,
};
