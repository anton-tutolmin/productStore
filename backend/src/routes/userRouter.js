const KoaRouter = require('koa-router');

const UserController = require('../controllers/user');
const router = new KoaRouter();

router
  .get('/users', UserController.getAllUsers)

  .get('/users/:id', UserController.getUserById)

  .put('/users/:id', UserController.updateUserById)

  .delete('/users/:id', UserController.deleteUserById)

module.exports = router;