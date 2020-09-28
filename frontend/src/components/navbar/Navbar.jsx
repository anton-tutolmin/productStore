import React, { useState } from 'react';
import { MenuButton } from './menuButton.jsx';
import Dropdown from './dropdown.jsx';
import './navbar.sass';

export const Navbar = (props) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <header>
      <div className="navbar">
        <div className="logo">PRODUCT STORE</div>
        <nav>
          <ul className="nav__links">{props.children}</ul>
        </nav>
        <MenuButton toggleDropdown={toggleDropdown} />
      </div>
      {open ? <Dropdown toggleDropdown={toggleDropdown} /> : null}
    </header>
  );
};

export default Navbar;
