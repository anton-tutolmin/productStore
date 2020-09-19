import { bindActionCreators } from 'redux';
import axios from 'axios';
import store from '../..';
import { addNotification } from '../index';

const showLoading = () => ({ type: 'SHOW_PRODUCT_LOADING' });
const hideLoading = () => ({ type: 'HIDE_PRODUCT_LOADING' });
const load = (payload) => ({ type: 'PRODUCT_LOAD', payload });

const doProductsLoad = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/products/',
        headers: { Authorization: 'Bearer token' },
      });
      dispatch(hideLoading());
      dispatch(load(res.data.products));
    } catch (e) {
      dispatch(addNotification(e.message));
    }
  };
};

export default bindActionCreators(
  { load: doProductsLoad },
  store.dispatch,
);
