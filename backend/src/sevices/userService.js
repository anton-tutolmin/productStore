const UserHandler = require('../operations/userHandler');

const userSevice = () => {

  const getAll = () => {
    const users = await UserHandler.getAll();
    users.map(user => ({
      username: user.username,
      phone: user.phone
    }));
  }

  const getProfile = () => {
    //TODO
  }

  const login = (body) => {
    //TODO
  }

  const register = (body) => {
    //TODO
  }

  const getById = (id) => {
    //TODO
  }

  const updateById = (id) => {
    //TODO
  }

  const deleteById = (id) => {
    //TODO
  }
}



module.exports = userService;