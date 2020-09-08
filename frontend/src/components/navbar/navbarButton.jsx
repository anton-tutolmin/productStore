import React from 'react';
import { Link } from 'react-router-dom';
import './navbarButton.sass';

export const NavbarButton = (props) => {
  let classList = 'navbar__button';

  if (props.active === props.path) {
    classList += ' active';
  }

  const handleClick = () => {
    props.setActive(props.path);
  };

  return (
    <button type="button" className={classList}>
      <Link to={props.path} onClick={handleClick}>
        {props.label}
      </Link>
    </button>
  );
};
