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

const loadDelivery = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/delivery',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { error };
  }
};

const takeDelivery = async (orderId) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `/api/orders/${orderId}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};

export default { order, load, update, loadDelivery, takeDelivery };
