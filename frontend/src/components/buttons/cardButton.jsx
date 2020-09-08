import React from 'react';
import './cardButton.sass';

export const CardButton = (props) => {
  return (
    <button
      className="card__btn"
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};
