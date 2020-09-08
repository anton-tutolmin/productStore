import React from 'react';
import { CardButton } from '../buttons/cardButton.jsx';
import './requestItem.sass';

export const RequestItem = (props) => {
  return (
    <div className="requestcard">
      <img
        className="requestcard__img"
        src="https://media-cdn.tripadvisor.com/media/photo-s/18/1a/d5/1e/casteloes.jpg"
        alt="pizza"
      />
      <div className="requestcard__text">
        <ul>
          <li>Pizza 4 cheese</li>
          <li>$120</li>
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
