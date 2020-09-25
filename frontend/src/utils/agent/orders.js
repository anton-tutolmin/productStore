import axios from 'axios';

const order = async (productId) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/orders/',
      data: { productId },
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};

const load = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}/orders`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

const update = async (orderId, status) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `/api/orders/${orderId}`,
      data: {
        status,
      },
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};

const loadRequests = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/requests',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};

export default { order, load, update, loadRequests };
