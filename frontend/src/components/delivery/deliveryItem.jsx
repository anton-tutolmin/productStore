import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './deliveryItem.sass';

export const DeliveryItem = (props) => {
  const { product, client, orderId, status, deliver } = props;

  return (
    <div className="deliverycard">
      <img
        className="deliverycard__img"
        src={product.img}
        alt="pizza"
      />
      <div className="deliverycard__text">
        <ul>
          <li>
            {product.productname} ${product.coast}
          </li>
          <li>
            <span className="deliverycard__info">{status}</span>
          </li>
          <li>
            <span className="deliverycard__info">
              {client.username} {client.phone}
            </span>
          </li>
          <li>
            <CardButton
              label="Delivere"
              onClick={() => deliver(orderId)}
              disabled={status !== 'delivering'}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
