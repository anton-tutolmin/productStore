const intialState = {
  products: [],
  loading: true,
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case 'PRODUCT_LOAD':
      return { products: action.payload, loading: false };
    default:
      return state;
  }
}
