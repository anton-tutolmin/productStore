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

export default { order };
