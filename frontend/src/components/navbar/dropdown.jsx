import React from 'react';
import { Link } from 'react-router-dom';
import Paths from '../../constants/paths';
import './dropdown.sass';

export const Dropdown = () => {
  return (
    <div className="menu">
      <ul>
        <DropdownItem path={Paths.product} label="Products" />
        <DropdownItem path={Paths.order} label="Orders" />
        <DropdownItem path={Paths.delivery} label="Delivery" />
        <DropdownItem path={Paths.request} label="Requests" />
        <LoginItem path={Paths.login} />
        <RegisterItem path={Paths.register} />
      </ul>
    </div>
  );
};

export const DropdownItem = (props) => {
  return (
    <li className="menu__links">
      <Link to={props.path}>{props.label}</Link>
    </li>
  );
};

export const LoginItem = (props) => {
  return (
    <li className="menu__links menu__links-login">
      <Link to={props.path}>login</Link>
    </li>
  );
};

export const RegisterItem = (props) => {
  return (
    <li className="menu__links menu__links-register">
      <Link to={props.path}>register</Link>
    </li>
  );
};

export default Dropdown;
