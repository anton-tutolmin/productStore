import {
  ADD_NOTIFICATION,
  ADD_TO_CART,
  AUTH,
  CANCEL_ORDER,
  DELIVER_ORDER,
  DONE_ORDER,
  LOAD_ORDER,
  LOAD_PRODUCT,
  LOAD_REQUEST,
  LOAD_USER,
  NEED_AUTH,
  NEED_NO_AUTH,
  REDUCE_BALANCE,
  REMOVE_FROM_CART,
  REMOVE_NOTIFICATION,
  REMOVE_REQUEST,
  CLEAR_USER,
} from './actionTypes';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const addNotification = (text) => ({
  type: ADD_NOTIFICATION,
  payload: text,
});

export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
});

export const authorize = () => ({ type: AUTH });

export const requireAuth = () => ({ type: NEED_AUTH });

export const unrequireAuth = () => ({ type: NEED_NO_AUTH });

export const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user,
});

export const reduceBalance = (subtrahend) => ({
  type: REDUCE_BALANCE,
  payload: subtrahend,
});

export const loadProducts = (payload) => ({
  type: LOAD_PRODUCT,
  payload,
});

export const loadOrder = (orders) => ({
  type: LOAD_ORDER,
  payload: orders,
});

export const loadRequests = (requests) => ({
  type: LOAD_REQUEST,
  payload: requests,
});

export const removeRequest = (orderId) => ({
  type: REMOVE_REQUEST,
  payload: orderId,
});

export const deliverDelivery = (orderId) => ({
  type: DELIVER_ORDER,
  payload: orderId,
});

export const cancelOrder = (orderId) => ({
  type: CANCEL_ORDER,
  payload: orderId,
});

export const doneOrder = (orderId) => ({
  type: DONE_ORDER,
  payload: orderId,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});
