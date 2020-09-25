import agent from '../../../utils/agent/orders';
import {
  addNotification,
  removeFromCart,
  reduceBalance,
  loadOrder,
  loadRequests,
  removeRequest,
  deliverDelivery,
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

export const doLoadOrders = (userId) => {
  return async (dispatch) => {
    if (!userId) {
      return;
    }

    const response = await agent.load(userId);
    if (response.error) {
      dispatch(addNotification(response.error));
    } else {
      dispatch(loadOrder(response.orders));
    }
  };
};

export const doUpdateOrder = (orderId, status) => {
  return async (dispatch) => {
    const response = await agent.update(orderId, status);
    if (response.error) {
      dispatch(addNotification(response.error));
    } else {
      dispatch(addNotification(response.message));
    }
  };
};

export const doLoadRequests = () => {
  return async (dispatch) => {
    const response = await agent.loadRequests();
    if (response.error) {
      dispatch(addNotification(response.error));
    } else {
      dispatch(loadRequests(response.requests));
    }
  };
};

export const doTakeRequest = (orderId) => {
  return async (dispatch) => {
    const response = await agent.update(orderId, 'delivering');
    if (response.error) {
      dispatch(addNotification(response.error));
    } else {
      dispatch(addNotification(response.message));
      dispatch(removeRequest(orderId));
    }
  };
};

export const doDeliverDelivery = (orderId) => {
  return async (dispatch) => {
    const response = await agent.update(orderId, 'delivered');
    console.log(response);
    if (response.error) {
      dispatch(addNotification(response.error));
    } else {
      dispatch(addNotification(response.message));
      dispatch(deliverDelivery(orderId));
    }
  };
};
