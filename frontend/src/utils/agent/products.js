import axios from 'axios';

const load = async () => {
  try {
    const response = await axios.get('/api/products/');
    return response.data;
  } catch (error) {
    return { error };
  }
};

export default { load };
