import React from 'react';
import { connect } from 'react-redux';
import { CartItem } from './cartItem.jsx';
import { removeFromCart, addNotification } from '../../store/actions';
import { doOrderProduct } from '../../store/actions/async/order';
import './cart.sass';

const Cart = (props) => {
  const { cart, balance, order, remove, showError } = props;

  const onOrder = (product, index) => {
    if (product.coast > balance) {
      showError('Not enough money');
    } else {
      order(product, index);
    }
  };

  const onRemove = (index) => {
    remove(index);
  };

  return (
    <div className="cart">
      {cart.map((c, i) => (
        <CartItem
          product={c}
          removeFromCart={onRemove}
          index={i}
          key={c.id}
          order={onOrder}
        />
      ))}
      {cart.length === 0 ? 'Empty' : null}
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
