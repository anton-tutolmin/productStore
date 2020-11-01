class Client {
  constructor({ username, password, email, phone, balance }) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.balance = balance || 0;
  }
}

module.exports = {
  Client,
};
