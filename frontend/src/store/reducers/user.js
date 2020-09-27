import { LOAD_USER, REDUCE_BALANCE } from '../actions/actionTypes';

const initialState = {
  id: null,
  username: '',
  email: '',
  phone: '',
  balance: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...action.payload,
      };
    case REDUCE_BALANCE:
      return { ...state, balance: state.balance - action.payload };
    default:
      return state;
  }
}
