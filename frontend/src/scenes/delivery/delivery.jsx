import React from 'react';
import { DeliveryItem } from '../../components/delivery/deliveryItem.jsx';
import { products } from '../../constants/mock';
import './delivery.sass';

export const Delivery = () => {
  return (
    <div className="delivery">
      {products.map((p) => (
        <div className="delivery__container" key={p.id}>
          <DeliveryItem product={p} />
        </div>
      ))}
    </div>
  );
};
