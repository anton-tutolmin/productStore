import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './requestItem.sass';

export const RequestItem = (props) => {
  const { product, client, orderId } = props;

  return (
    <div className="requestcard">
      <img
        className="requestcard__img"
        src={product.img}
        alt="pizza"
      />
      <div className="requestcard__text">
        <ul>
          <li>{product.productname}</li>
          <li>${product.coast}</li>
          <li>
            <span className="requestcard__info">
              {client.username} {client.phone}
            </span>
          </li>
          <li>
            <CardButton
              label="Take"
              onClick={() => console.log(`Take ${orderId}`)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
