const UserHandler = require('../operations/userHandler');
const OrderHandler = require('../operations/orderHandler');

const userService = () => {

  const getAll = async () => {
    const users = await UserHandler.getAll();
    users.map(user => ({
      username: user.username,
      email: user.email,
      phone: user.phone
    }));
    return users;
  }

  const getProfile = async (id) => {
    const profile = await UserHandler.getProfile(id);
    const profile = {
      username: profile.username,
      email: profile.email,
      phone: profile.phone
    }
    return profile;
  }

  const login = async (body) => {
    await UserHandler.login(body);
  }

  const register = async (body) => {
    await UserHandler.register(body)
  }

  const getById = async (id) => {
    const user = await UserHandler.getById(id);
    user = {
      username: user.username,
      email: user.email,
      phone: user.phone
    };
  }

  const updateById = async (id, body) => {
    await UserHandler.updateById(id, body);
  }

  const deleteById = async (id) => {
    await UserHandler.deleteById(id);
    await OrderHandler.deleteByUserId(id);
  }
}



module.exports = userService;