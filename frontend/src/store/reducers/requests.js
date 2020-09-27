import { LOAD_REQUEST, REMOVE_REQUEST } from '../actions/actionTypes';

const initialState = {
  requests: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REQUEST:
      return {
        requests: action.payload,
        loading: false,
      };
    case REMOVE_REQUEST:
      return {
        requests: state.requests.filter(
          (r) => r.id !== action.payload,
        ),
        loading: false,
      };
    default:
      return state;
  }
}
