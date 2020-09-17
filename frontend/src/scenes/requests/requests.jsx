import React from 'react';
import { RequestItem } from '../../components/request/requestItem.jsx';
import { products } from '../../constants/mock';
import './request.sass';

export const Request = () => {
  return (
    <div className="requests">
      {products.map((p) => (
        <div className="request__container" key={p.id}>
          <RequestItem product={p} />
        </div>
      ))}
    </div>
  );
};
