import React from 'react';
import { Link } from 'react-router-dom';

export const DropdownItem = (props) => {
  return (
    <li className="dropdown__button">
      <Link to={props.path}>{props.label}</Link>
    </li>
  );
};

export default DropdownItem;
