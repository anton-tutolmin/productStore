const UserController = require('../src/controllers/userController');

test('testing jest', () => {
  expect(UserController.test()).toBe(3);
});