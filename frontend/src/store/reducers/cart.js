const initialState = {
  cart: [],
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        cart: state.cart.concat(action.payload),
      };
    case 'REMOVE_FROM_CART':
      return {
        cart: state.cart.filter((o) => o.id !== action.payload),
      };
    default:
      return state;
  }
}
