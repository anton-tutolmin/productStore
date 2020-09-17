import axios from 'axios';
import { bindActionCreators } from 'redux';

export const doProductsLoad = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    const res = await axios.get('/api/products');
    if (res.error) {
      dispatch(addNotification(res.error));
    } else {
      dispatch(hideLoading());
      dispatch(load(res.products));
    }
  };
};
