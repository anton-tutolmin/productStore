const initialState = {
  username: '',
  email: '',
  phone: '',
  balance: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOAD':
      return {
        ...action.payload,
      };
    case 'REDUCE_BALANCE':
      return { ...state, balance: state.balance - action.payload };
    default:
      return state;
  }
}
