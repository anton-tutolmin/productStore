import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarItem = (props) => {
  return (
    <li>
      <Link to={props.path}>{props.label}</Link>
    </li>
  );
};

export default NavbarItem;
