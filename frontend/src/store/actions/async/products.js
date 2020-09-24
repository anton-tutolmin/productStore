import { addNotification } from '../index';
import agent from '../../../utils/agent/products';

const load = (payload) => ({ type: 'PRODUCT_LOAD', payload });

export const doLoadProducts = () => {
  return async (dispatch) => {
    const response = await agent.load();
    if (response.error) {
      dispatch(addNotification(response.error.message));
    } else if (response.message) {
      dispatch(addNotification(response.message));
    } else {
      dispatch(load(response.products));
    }
  };
};
