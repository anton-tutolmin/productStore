import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './deliveryItem.sass';

export const DeliveryItem = (props) => {
  const { product } = props;

  return (
    <div className="deliverycard">
      <img
        className="deliverycard__img"
        src={product.img}
        alt="pizza"
      />
      <div className="deliverycard__text">
        <ul>
          <li>{product.productname}</li>
          <li>
            <span className="deliverycard__info">Anton</span>
          </li>
          <li>
            <span className="deliverycard__info">
              +7(950)794-8046
            </span>
          </li>
          <li>
            <CardButton
              label="Delivere"
              onClick={() => console.log('delivere')}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
