import axios from './axios';

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
    const response = await axios({
      method: 'GET',
      url: `/api/users/${userId}/orders`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};

const loadById = async (orderId) => {
  try {
    const response = await axios({
      method: 'GET',
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

const getRequest = async (orderId) => {
  try {
    const response = await axios({
      method: 'POST',
      data: {
        orderId,
      },
      url: `/api/orders/${orderId}/candidates`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};

const loadCandidates = async (orderId) => {
  try {
    const response = await axios.get(`/api/orders/${orderId}/candidates`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

const pickCandidate = async (orderId, curierId) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `/api/orders/${orderId}/candidates`,
      data: {
        curierId,
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

export default {
  order,
  load,
  loadById,
  update,
  loadRequests,
  getRequest,
  loadCandidates,
  pickCandidate,
};
