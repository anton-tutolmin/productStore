const initialState = {
  notifications: [],
  lastId: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        lastId: state.lastId + 1,
        notifications: state.notifications.concat({
          id: state.lastId,
          data: action.payload,
        }),
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload,
        ),
      };
    default:
      return state;
  }
}
