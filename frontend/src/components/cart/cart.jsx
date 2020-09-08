import React from 'react';
import { connect } from 'react-redux';
import { CartItem } from './cartItem.jsx';
import './cart.sass';

const Cart = (props) => {
  const { cart, removeFromCart } = props;

  return (
    <div className="cart">
      {cart.map((c, i) => (
        <CartItem
          product={c}
          removeFromCart={removeFromCart}
          key={i}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (payload) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
