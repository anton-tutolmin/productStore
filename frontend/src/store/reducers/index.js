import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import cart from './cart';
import notifications from './notifications';
import user from './user';

export default combineReducers({
  auth,
  products,
  cart,
  notifications,
  user,
});
