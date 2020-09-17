import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './orderItem.sass';

export const OrderItem = (props) => {
  const { order } = props;
  order.status = 'delivering';

  return (
    <div className="ordercard">
      <img className="ordrcard__img" src={order.img} alt="pizza" />
      <div className="ordercard__text">
        <ul>
          <li>{order.productname}</li>
          <li>
            <span className="ordercard__status">{order.status}</span>
          </li>
          <li>
            <CardButton
              label="Done"
              onClick={() => console.log('done')}
              disabled={order.status !== 'delivered'}
            />
            <CardButton
              label="Cancel"
              onClick={() => console.log('cancel')}
              isabled={order.status === 'delivered'}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
