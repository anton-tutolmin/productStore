const initialState = {
  orders: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_LOAD':
      return { orders: action.payload, loading: false };
    default:
      return state;
  }
}
