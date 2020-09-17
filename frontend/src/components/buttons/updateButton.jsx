import React from 'react';
import './updateButton.sass';

export const UpdateButton = (props) => {
  return (
    <button type="button" className="update-btn">
      {props.children}
    </button>
  );
};
