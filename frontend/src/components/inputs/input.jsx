import React from 'react';
import './input.sass';

export const Input = (props) => {
  const htmlFor = props.type + Math.random();
  return (
    <div className="form__input">
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};
