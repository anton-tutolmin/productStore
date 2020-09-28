import React from 'react';
import './orderTitle.sass';

export const OrderTitle = (props) => {
  return <div className="order__title">{props.children}</div>;
};
