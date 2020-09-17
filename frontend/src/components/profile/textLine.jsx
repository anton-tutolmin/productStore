import React from 'react';
import { UpdateButton } from '../buttons/updateButton.jsx';
import './textLine.sass';

export const TextLine = (props) => {
  return (
    <div className="textline">
      {props.paramname}:<span>{props.text}</span>
      <UpdateButton>{props.children}</UpdateButton>
    </div>
  );
};
