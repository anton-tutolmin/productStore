class UserDto {
  constructor(user) {
    this.id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.balance = user.balance;
  }
}

module.exports = {
  UserDto,
};
