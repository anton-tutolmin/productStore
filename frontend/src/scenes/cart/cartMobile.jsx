import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, addNotification } from '../../store/actions';
import { doOrderProduct } from '../../store/actions/async/order';
import {} from '../../components/cart/cartItem.jsx';
import './cartMobile.sass';

const CartMobile = (props) => {
  console.log(0.6 + 1);
  return <h1 className="cartmobile">Cart</h1>;
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  balance: state.user.balance,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (indexInCart) => dispatch(removeFromCart(indexInCart)),
  order: (product, index) => dispatch(doOrderProduct(product, index)),
  showError: (text) => dispatch(addNotification(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartMobile);
