import axios from './axios';

export const addRating = async (rating, curierId) => {
  axios({
    method: 'POST',
    url: '/api/rating',
    data: { rating, curierId },
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};
