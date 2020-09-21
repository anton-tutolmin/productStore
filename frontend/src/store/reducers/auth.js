const initialState = {
  auth: false,
  needAuth: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        auth: true,
        needAuth: false,
      };
    case 'NEED_AUTH':
      return {
        auth: false,
        needAuth: true,
      };
    case 'NEED_NO_AUTH':
      return {
        auth: false,
        needAuth: false,
      };
    default:
      return state;
  }
};
