import axios from 'axios';

const update = async (param, id) => {
  const response = await axios({
    method: 'PUT',
    url: `/api/users/${id}`,
    data: param,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export default { update };
