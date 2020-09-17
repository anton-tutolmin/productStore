import React from 'react';
import { connect } from 'react-redux';
import { CartItem } from './cartItem.jsx';
import { removeFromCart, addNotification } from '../../store/actions';
import './cart.sass';

const Cart = (props) => {
  const { cart, remove } = props;

  return (
    <div className="cart">
      {cart.map((c, i) => (
        <CartItem product={c} removeFromCart={remove} key={i} />
      ))}
      {cart.length === 0 ? 'Empty' : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (payload) => dispatch(removeFromCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
