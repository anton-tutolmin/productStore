const initialState = {
  auth: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        auth: true,
      };
    case 'UNAUTH':
      return {
        auth: false,
      };
    default:
      return state;
  }
};
