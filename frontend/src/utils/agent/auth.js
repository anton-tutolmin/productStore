import axios from './axios';

const load = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/profile/',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (err) {
    return { err };
  }
};

const login = async (user) => {
  try {
    const response = await axios.post('/api/login/', user);
    return response.data;
  } catch (err) {
    return { err };
  }
};

const register = async (user) => {
  try {
    const response = await axios.post('/api/register/', user);
    return response.data;
  } catch (err) {
    return { err };
  }
};

export default {
  load,
  login,
  register,
};
