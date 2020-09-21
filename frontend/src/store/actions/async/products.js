import { addNotification } from '../index';
import agent from '../../../utils/agent/products';

const showLoading = () => ({ type: 'SHOW_PRODUCT_LOADING' });
const hideLoading = () => ({ type: 'HIDE_PRODUCT_LOADING' });
const load = (payload) => ({ type: 'PRODUCT_LOAD', payload });

export const doLoadProducts = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    const response = await agent.load();
    dispatch(hideLoading());
    if (response.error) {
      dispatch(addNotification(response.error.message));
    } else if (response.message) {
      dispatch(addNotification(response.message));
    } else {
      dispatch(load(response.products));
    }
  };
};
