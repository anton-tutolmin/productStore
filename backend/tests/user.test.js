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

    test('Creating user', async () => {
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
      expect(user.balance).toBe(0);

      createdUser = user;
    });

    test('Getting all user', async () => {
      const users = await UserController.getAll();

      expect(users.length).toBe(1);
    });

    test('Getting user by id', async () => {
      const user = await UserController.getById(createdUser._id);

      expect(user.username).toBe(createdUser.username);
      expect(user.email).toBe(createdUser.email);
      expect(user.phone).toBe(createdUser.phone);
    });

    test('Updating user by id', async () => {
      await UserController.updateById(createdUser._id, {
        username: 'irina'
      });

      const user1 = await UserController.getById(createdUser._id);

      await UserController.updateById(createdUser._id, {
        email: 'irina@gmail.com'
      });

      const user2 = await UserController.getById(createdUser._id);

      await UserController.updateById(createdUser._id, {
        phone: '22222222222'
      });

      const user3 = await UserController.getById(createdUser._id);

      const user4 = await UserController.getById(createdUser._id);

      expect(user1.username).toBe('irina');
      expect(user2.email).toBe('irina@gmail.com');
      expect(user3.phone).toBe('22222222222');
    });

    test('Deleting user by id', async () => {
      await UserController.deleteById(createdUser._id);
      const users = await UserController.getAll();

      expect(users.length).toBe(0);
    });

  });

  describe('Users errors tests:', () => {
    
    test('Create user with wrong params', async () => {
      const user = {
        username: 'testwrongcreate',
        password: 'testwrongcreate',
        email: 'testwrongcreate@gmail.com',
        phone: '11111111111',
        type: 1
      }

      try {
        await UserController.create({
          ...user,
          username: '@#$%^123$%^',
        });
      } catch(e) {
        expect(e.message).toBe('Username is not correct');
      }

      try {
        await UserController.create({
          ...user,
          username: 'aa',
        });
      } catch(e) {
        expect(e.message).toBe('Username is not correct');
      }

      try {
        await UserController.create({
          ...user,
          email: '@#$%^123$%^@gmail.com',
        });
      } catch(e) {
        expect(e.message).toBe('Email is not correct')
      }

      try {
        await UserController.create({
          ...user,
          email: 'anton@example.com',
        });
      } catch(e) {
        expect(e.message).toBe('Email is not correct');
      }

      try {
        await UserController.create({
          ...user,
          phone: 'notcorrectnumber',
        });
      } catch(e) {
        expect(e.message).toBe('Phone is not correct');
      }

      try {
        await UserController.create({
          ...user,
          phone: '1234567',
        });
      } catch(e) {
        expect(e.message).toBe('Phone is not correct');
      }

      try {
        await UserController.create({
          ...user,
          type: 4,
        });
      } catch(e) {
        expect(e.message).toBe('Type is not correct');
      }
    });

    test('Get user with wrong id', async () => {
      try {
        await UserController.getById('wrongid');
      } catch(e) {
        expect(e.message).toBe('Not valid id');
      }
    });

    test('Delete user with wrong id', async () => {
      try {
        await UserController.deleteById('wrongid');
      } catch(e) {
        expect(e.message).toBe('Not valid id');
      }
    });

    describe('Update with wrong:', () => {
      let user;

      beforeAll(async () => {
        user = await UserController.create({
          username: 'testwrongupdate',
          password: 'testwrongupdate',
          email: 'testwrongupdate@gmail.com',
          phone: '11111111111',
          type: 1
        });
      });

      test('Username', async () => {
        try {
          await UserController.updateById(user._id, {
            username: '!@#$%'
          });
        } catch(e) {
          expect(e.message).toBe('Username is not correct');
        }

        try {
          await UserController.updateById(user._id, {
            username: 'aa'
          });
        } catch(e) {
          expect(e.message).toBe('Username is not correct');
        }
      });

      test('Email', async () => {
        try {
          await UserController.updateById(user._id, {
            email: 'aa@example.com'
          });
        } catch(e) {
          expect(e.message).toBe('Email is not correct');
        }
      });

      test('Phone', async () => {
        try {
          await UserController.updateById(user._id, {
            phone: 'wrongnumber'
          });
        } catch(e) {
          expect(e.message).toBe('Phone is not correct');
        }
      });

      test('Type', async () => {
        try {
          await UserController.updateById(user._id, {
            type: 4
          });
        } catch(e) {
          expect(e.message).toBe('Type is not correct');
        }
      });

      test('Balance', async () => {
        try {
          await UserController.updateById(user._id, {
            balance: -1
          });
        } catch(e) {
          expect(e.message).toBe('Balance is not correct');
        }
      });
    });

  });

});