import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './deliveryItem.sass';

export const DeliveryItem = (props) => {
  const { product, client, orderId, delivere } = props;

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
          <li>${product.coast}</li>
          <li>
            <span className="deliverycard__info">
              {client.username} {client.phone}
            </span>
          </li>
          <li>
            <CardButton
              label="Delivere"
              onClick={() => delivere(orderId)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
