export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const removeFromCart = (id) => ({
  type: 'REMOVE_FROM_CART',
  payload: id,
});

export const addNotification = (text) => ({
  type: 'ADD_NOTIFICATION',
  payload: text,
});

export const removeNotification = (id) => ({
  type: 'REMOVE_NOTIFICATION',
  payload: id,
});

export const authorize = () => ({ type: 'AUTH' });

export const unauthorize = () => ({ type: 'UNAUTH' });

export const requireAuth = () => ({ type: 'NEED_AUTH' });

export const unrequireAuth = () => ({ type: 'NEED_NO_AUTH' });

export const loadUser = (user) => ({
  type: 'USER_LOAD',
  payload: user,
});

export const reduceBalance = (subtrahend) => ({
  type: 'REDUCE_BALANCE',
  payload: subtrahend,
});
