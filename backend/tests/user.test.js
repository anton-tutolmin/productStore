const mongoose = require('mongoose');
const UserController = require('../src/controllers/userController');

const url = require('./config').url;

describe('User tests:', () => {

  beforeAll(async () => {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('users');
    await mongoose.connection.close();
  });

  describe('User operations:', () => {

    let createdUser;

    test('Creating user:', async () => {
      const user = await UserController.create({
        username: 'anton',
        password: 'anton',
        email: 'anton@gmail.com',
        phone: '11111111111',
        type: 1
      });

      expect(user.username).toBe('anton');
      expect(user.password).toBe('anton');
      expect(user.email).toBe('anton@gmail.com');
      expect(user.phone).toBe('11111111111');
      expect(user.type).toBe(1);

      createdUser = user;
    });

    test('Getting all user:', async () => {
      const users = await UserController.getAll();

      expect(users.length).toBe(1);
    });

    test('Getting user by id:', async () => {
      const user = await UserController.getById(createdUser._id);

      expect(user.username).toBe(createdUser.username);
      expect(user.email).toBe(createdUser.email);
      expect(user.phone).toBe(createdUser.phone);
      expect(user.type).toBe(createdUser.type);
    });

    test('Updating user by id:', async () => {
      const user1 = await UserController.updateById(createdUser._id, {
        username: 'irina'
      });

      const user2 = await UserController.updateById(createdUser._id, {
        email: 'irina@gmail.com'
      });

      const user3 = await UserController.updateById(createdUser._id, {
        phone: '22222222222'
      });

      const user4 = await UserController.updateById(createdUser._id, {
        type: 2
      });

      expect(user1.username).toBe('irina');
      expect(user2.email).toBe('irina@gmail.com');
      expect(user3.phone).toBe('22222222222');
      expect(user4.type).toBe(2);
    });

    test('Deleting user by id:', async () => {
      await UserController.deleteById(createdUser._id);
      const users = await UserController.getAll();

      expect(users.length).toBe(0);
    });

  });

});