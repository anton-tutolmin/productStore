import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './orderItem.sass';

export const OrderItem = (props) => {
  const { order } = props;
  return (
    <div className="ordercard">
      <img className="ordrcard__img" src={order.img} alt="pizza" />
      <div className="ordercard__text">
        <ul>
          <li>{order.productname}</li>
          <li>
            <span className="ordercard__status">Delivering</span>
          </li>
          <li>
            <CardButton
              label="Done"
              onClick={() => console.log('done')}
            />
            <CardButton
              label="Cancel"
              onClick={() => console.log('cancel')}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
