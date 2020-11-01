import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navbar } from '../../components/navbar/navbar.jsx';
import { NavbarItem } from '../../components/navbar/navbarItem.jsx';
import { NavbarButton } from '../../components/navbar/navbarButton.jsx';
import { ProfileButton } from '../../components/navbar/profileButton.jsx';
import CartButton from '../../components/navbar/cartButton.jsx';
import Cart from '../../components/cart/cart.jsx';
import Paths from '../../constants/paths';

const ClientNavbarItems = (props) => {
  return (
    <NavbarItem
      path={Paths.order}
      label="Order"
      active={props.active}
      setActive={props.setActive}
    />
  );
};

const CurierNavbarItems = (props) => {
  return (
    <>
      <NavbarItem
        path={Paths.delivery}
        label="Delivery"
        active={props.active}
        setActive={props.setActive}
      />
      <NavbarItem
        path={Paths.request}
        label="Request"
        active={props.active}
        setActive={props.setActive}
      />
    </>
  );
};

const AuthNavbarItems = (props) => {
  return (
    <>
      <ProfileButton
        active={props.active}
        setActive={props.setActive}
      />
      <CartButton show={props.show} toggleShow={props.toggleShow} />
    </>
  );
};

const UnauthNavbarItems = (props) => {
  return (
    <>
      <NavbarButton
        path={Paths.login}
        label="Login"
        active={props.active}
        setActive={props.setActive}
      />
      <NavbarButton
        path={Paths.register}
        label="Register"
        active={props.active}
        setActive={props.setActive}
      />
    </>
  );
};

const Header = (props) => {
  const { auth, userType } = props;
  const [active, setActive] = useState(
    `/${document.URL.split('/')[3]}`,
  );

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Navbar>
        <NavbarItem
          path={Paths.product}
          label="Products"
          active={active}
          setActive={setActive}
        />
        {userType === 'client' ? (
          <ClientNavbarItems active={active} setActive={setActive} />
        ) : null}
        {userType === 'curier' ? (
          <CurierNavbarItems active={active} setActive={setActive} />
        ) : null}
        {auth ? (
          <AuthNavbarItems
            active={active}
            setActive={setActive}
            show={show}
            toggleShow={toggleShow}
          />
        ) : (
          <UnauthNavbarItems active={active} setActive={setActive} />
        )}
      </Navbar>
      {show ? <Cart /> : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  userType: state.user.type,
});

export default connect(mapStateToProps, null)(Header);
