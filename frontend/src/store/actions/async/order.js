import agent from '../../../utils/agent/orders';
import {
  addNotification,
  removeFromCart,
  reduceBalance,
} from '../index';

export const doOrderProduct = (product, indexInCart) => {
  return async (dispatch) => {
    const response = await agent.order(product._id);
    if (response.error) {
      dispatch(addNotification(response.error));
    } else if (response.message) {
      dispatch(addNotification(response.message));
      dispatch(removeFromCart(indexInCart));
      dispatch(reduceBalance(product.coast));
    }
  };
};

// export const doLoadOrders = (userId) => {
//   return async (dispatch) => {};
// };
