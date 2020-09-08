import { products } from '../../constants/mock';

const intialState = {
  products,
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
