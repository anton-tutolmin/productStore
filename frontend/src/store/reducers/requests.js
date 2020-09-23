const initialState = {
  requests: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_LOAD':
      return {
        requests: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
