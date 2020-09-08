import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarItem = (props) => {
  const { active, setActive } = props;
  let classList = '';

  const handleClick = () => {
    setActive(props.path);
  };

  if (active === props.path) {
    classList += 'active';
  }

  return (
    <li>
      <Link
        className={classList}
        to={props.path}
        onClick={handleClick}
      >
        {props.label}
      </Link>
    </li>
  );
};

export default NavbarItem;
