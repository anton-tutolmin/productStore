class UserDto {
  constructor({ _id, username, email, phone, balance }) {
    this.id = _id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.balance = balance;
  }
}

module.exports = {
  UserDto,
};
