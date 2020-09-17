import React from 'react';
import { OrderItem } from '../../components/order/orderItem.jsx';
import { products } from '../../constants/mock';
import './orders.sass';

export const Orders = () => {
  return (
    <div className="orders">
      {products.map((p) => (
        <div className="orders__container" key={p.id}>
          <OrderItem order={p} />
        </div>
      ))}
    </div>
  );
};
