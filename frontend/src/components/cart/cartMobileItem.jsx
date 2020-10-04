import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './cartMobileItem.sass';

export const CartMobileItem = (props) => {
  const { product, index, order, removeFromCart } = props;

  return (
    <div className="cart-mobile__item">
      <img src={product.img} alt="" className="cart-mobile__img" />
      <div className="cart-mobile__text">
        <ul>
          <li>{product.productname}</li>
          <li>${product.coast}</li>
          <li>
            <CardButton
              label="Order"
              onClick={() => order(product, index)}
            />
            <CardButton
              label="Delete"
              onClick={() => removeFromCart(index)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
