import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navbar } from '../../components/navbar/navbar.jsx';
import { NavbarItem } from '../../components/navbar/navbarItem.jsx';
import { NavbarButton } from '../../components/navbar/navbarButton.jsx';
import { ProfileButton } from '../../components/navbar/profileButton.jsx';
import CartButton from '../../components/navbar/cartButton.jsx';
import Cart from '../../components/cart/cart.jsx';
import Paths from '../../constants/paths';

const Header = (props) => {
  const { auth } = props;

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
        <NavbarItem
          path={Paths.order}
          label="Order"
          active={active}
          setActive={setActive}
        />
        <NavbarItem
          path={Paths.delivery}
          label="Delivery"
          active={active}
          setActive={setActive}
        />
        <NavbarItem
          path={Paths.request}
          label="Request"
          active={active}
          setActive={setActive}
        />
        {auth ? (
          <>
            <ProfileButton active={active} setActive={setActive} />
            <CartButton show={show} toggleShow={toggleShow} />
          </>
        ) : (
          <>
            <NavbarButton
              path={Paths.login}
              label="Login"
              active={active}
              setActive={setActive}
            />
            <NavbarButton
              path={Paths.register}
              label="Register"
              active={active}
              setActive={setActive}
            />
          </>
        )}
      </Navbar>
      {show ? <Cart /> : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
});

export default connect(mapStateToProps, null)(Header);
