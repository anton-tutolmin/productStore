import axios from 'axios';

const order = async (productId) => {
  const response = await axios({
    method: 'POST',
    url: '/api/orders/',
    data: { productId },
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const load = async (userId) => {
  const response = await axios.get(`/api/users/${userId}/orders`);
  console.log(response.data);
  return response.data;
};

export default { order, load };
