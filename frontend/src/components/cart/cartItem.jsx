import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './cartItem.sass';

export const CartItem = (props) => {
  const { product, removeFromCart, toOrder } = props;

  const onDelete = () => {
    removeFromCart(product.id);
  };

  const onOrder = () => {
    toOrder(product.id);
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
          <li>Pizza 4 chesse</li>
          <li>$120</li>
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
