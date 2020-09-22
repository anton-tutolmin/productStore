import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './cartItem.sass';

export const CartItem = (props) => {
  const { product, removeFromCart, order, index } = props;

  const onDelete = () => {
    removeFromCart(index);
  };

  const onOrder = () => {
    order(product, index);
  };

  return (
    <div className="cart__item">
      <button
        className="cart__delete"
        type="button"
        onClick={onDelete}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <img src={product.img} alt="" className="cart__img" />
      <div className="cart__text">
        <ul>
          <li>{product.productname}</li>
          <li>${product.coast}</li>
          <li>
            <button
              type="button"
              className="cart__order"
              onClick={onOrder}
            >
              Order
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
