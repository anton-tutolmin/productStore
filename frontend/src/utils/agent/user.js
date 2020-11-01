import axios from './axios';

const loadByClientId = async (userId) => {
  const response = await axios.get(`/api/clients/${userId}`);
  return response.data;
};

const loadByCurierId = async (userId) => {
  const response = await axios.get(`/api/clients/${userId}`);
  return response.data;
};

const update = async (param, userId, userType) => {
  const response = await axios({
    method: 'PUT',
    url:
      userType === 'client'
        ? `/api/clients/${userId}`
        : `/api/curiers/${userId}`,
    data: param,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export default { update, loadByClientId, loadByCurierId };
