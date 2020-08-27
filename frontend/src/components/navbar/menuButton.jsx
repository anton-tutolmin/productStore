import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './menuButton.sass';

export const MenuButton = (props) => {
  return (
    <button type="button" className="navbar__menu-btn" onClick={props.toggleDropdown}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default MenuButton;
