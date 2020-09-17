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
