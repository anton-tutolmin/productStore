const initialState = {
  orders: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_LOAD':
      return { orders: action.payload, loading: false };
    case 'DELIVER_ORDER':
      return {
        orders: state.orders.map((o) =>
          o.id === action.payload ? { ...o, status: 'delivered' } : o,
        ),
        loading: false,
      };
    case 'CANCEL_ORDER':
      return {
        orders: state.orders.map((o) =>
          o.id === action.payload ? { ...o, status: 'canceled' } : o,
        ),
        loading: false,
      };

    case 'DONE_ORDER':
      return {
        orders: state.orders.map((o) =>
          o.id === action.payload ? { ...o, status: 'done' } : o,
        ),
        loading: false,
      };
    default:
      return state;
  }
}
