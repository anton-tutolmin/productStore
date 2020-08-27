export default function user(state, action) {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
