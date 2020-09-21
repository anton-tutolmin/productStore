export const addToCart = (payload) => ({
  type: 'ADD_TO_CART',
  payload,
});

export const removeFromCart = (payload) => ({
  type: 'REMOVE_FROM_CART',
  payload,
});

export const addNotification = (payload) => ({
  type: 'ADD_NOTIFICATION',
  payload,
});

export const removeNotification = (payload) => ({
  type: 'REMOVE_NOTIFICATION',
  payload,
});

export const authorize = () => ({ type: 'AUTH' });

export const unauthorize = () => ({ type: 'UNAUTH' });

export const requireAuth = () => ({ type: 'NEED_AUTH' });

export const unrequireAuth = () => ({ type: 'NEED_NO_AUTH' });

export const loadUser = (payload) => ({ type: 'USER_LOAD', payload });
