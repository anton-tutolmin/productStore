const initialState = {
  username: 'anton',
  email: 'anton@gmail.com',
  phone: '+7(950)7948046',
  balance: 120,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
