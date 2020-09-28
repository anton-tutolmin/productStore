import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './orderItem.sass';

export const OrderItem = (props) => {
  const { product, cancelOrder, doneOrder, orderId, status } = props;

  return (
    <div className="ordercard">
      <img className="ordrcard__img" src={product.img} alt="pizza" />
      <div className="ordercard__text">
        <ul>
          <li>{product.productname}</li>
          <li>
            <span className="ordercard__status">{status}</span>
          </li>
          <li>
            <CardButton
              label="Done"
              onClick={() => doneOrder(orderId)}
              disabled={status !== 'delivered'}
            />
            <CardButton
              label="Cancel"
              onClick={() => cancelOrder(orderId)}
              disabled={status !== 'created'}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export const HistoryOrderItem = (props) => {
  const { product, status } = props;
  return (
    <div className="ordercard">
      <img className="ordrcard__img" src={product.img} alt="pizza" />
      <div className="ordercard__text history__text">
        <ul>
          <li>{product.productname}</li>
          <li>
            <span className="ordercard__status">{status}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
