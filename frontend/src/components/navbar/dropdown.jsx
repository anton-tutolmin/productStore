import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paths from '../../constants/paths';
import './dropdown.sass';

const Dropdown = (props) => {
  const { toggleDropdown, auth, userType } = props;

  useEffect(() => {
    document.body.classList.add('lock');
    return () => {
      document.body.classList.remove('lock');
    };
  });

  return (
    <div className="menu">
      <ul>
        <DropdownItem
          path={Paths.product}
          label="Products"
          toggleDropdown={toggleDropdown}
        />
        {userType === 'client' ? (
          <DropdownItem
            path={Paths.order}
            label="Orders"
            toggleDropdown={toggleDropdown}
          />
        ) : null}
        {userType === 'curier' ? (
          <>
            <DropdownItem
              path={Paths.delivery}
              label="Delivery"
              toggleDropdown={toggleDropdown}
            />
            <DropdownItem
              path={Paths.request}
              label="Requests"
              toggleDropdown={toggleDropdown}
            />
          </>
        ) : null}
        {auth ? (
          <>
            <DropdownItem
              path={Paths.profile}
              label="Profile"
              toggleDropdown={toggleDropdown}
            />
            <DropdownItem
              path={Paths.cart}
              label="Cart"
              toggleDropdown={toggleDropdown}
            />
          </>
        ) : (
          <>
            <LoginItem
              path={Paths.login}
              toggleDropdown={toggleDropdown}
            />
            <RegisterItem
              path={Paths.register}
              toggleDropdown={toggleDropdown}
            />
          </>
        )}
      </ul>
    </div>
  );
};

export const DropdownItem = (props) => {
  return (
    <li className="menu__links">
      <Link to={props.path} onClick={props.toggleDropdown}>
        {props.label}
      </Link>
    </li>
  );
};

export const LoginItem = (props) => {
  return (
    <li className="menu__links menu__links-login">
      <Link to={props.path} onClick={props.toggleDropdown}>
        login
      </Link>
    </li>
  );
};

export const RegisterItem = (props) => {
  return (
    <li className="menu__links menu__links-register">
      <Link to={props.path} onClick={props.toggleDropdown}>
        register
      </Link>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    userType: state.user.type,
  };
};

export default connect(mapStateToProps, null)(Dropdown);
