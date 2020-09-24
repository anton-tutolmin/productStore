const initialState = {
  delivery: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'DELIVERY_LOAD':
      return {
        delivery: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
