import axios from './axios';

const load = async () => {
  try {
    const response = await axios.get('/api/products/');
    return response.data;
  } catch (error) {
    return { error };
  }
};

const loadById = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

export default { load, loadById };
