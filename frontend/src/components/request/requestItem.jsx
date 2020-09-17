import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './requestItem.sass';

export const RequestItem = (props) => {
  const { product } = props;

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
          <li>{product.coast}</li>
          <li>
            <span className="requestcard__info">Anton</span>
          </li>
          <li>
            <span className="requestcard__info">+7(950)794-8046</span>
          </li>
          <li>
            <CardButton
              label="Take"
              onClick={() => console.log('Take')}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
