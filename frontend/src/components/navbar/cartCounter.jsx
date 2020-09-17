import React from 'react';
import './cartCounter.sass';

export const CartCounter = (props) => {
  return (
    <div className="navbar__cartcounter">
      <div>{props.count}</div>
    </div>
  );
};
