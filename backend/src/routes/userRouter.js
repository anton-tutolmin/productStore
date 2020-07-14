const KoaRouter = require('koa-router');

const UserController = require('../controllers/userController');
const router = new KoaRouter();

router
  .get('/users', UserController.getAllUsers)

  .get('/users/:id', UserController.getUserById)

  .put('/users/:id', UserController.updateUserById)

  .delete('/users/:id', UserController.deleteUserById)

module.exports = router;