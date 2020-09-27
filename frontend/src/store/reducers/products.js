import { LOAD_PRODUCT } from '../actions/actionTypes';

const intialState = {
  products: [],
  loading: true,
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case LOAD_PRODUCT:
      return { products: action.payload, loading: false };
    default:
      return state;
  }
}
