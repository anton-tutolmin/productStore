import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Paths from '../constants/paths';
import Header from './header/header';
import Products from './products/wrapper';
import Orders from './orders/wrapper';
import Delivery from './delivery/wrapper';
import Request from './requests/wrapper';
import Register from './register/register';
import Login from './login/login';
import { Main } from './main/main';
import Profile from './profile/profile';
import Notifications from './notification/notifications';
import { Footer } from './footer/footer';
import CartMobile from './cart/cartMobile';
import { OrderInfo } from './orderInfo/orderInfo';

const ClientRoutes = () => {
  return [
    <Route
      path={Paths.order}
      component={Orders}
      key={`${Math.random()}order`}
    />,
    <Route
      path="/order/:id"
      component={OrderInfo}
      key={`${Math.random()}order-info`}
    />,
  ];
};

const CurierRoutes = () => {
  return [
    <Route
      path={Paths.delivery}
      component={Delivery}
      key={`${Math.random()}delivery`}
    />,
    <Route
      path={Paths.request}
      component={Request}
      key={`${Math.random()}request`}
    />,
    <Route
      path={Paths.cart}
      component={CartMobile}
      key={`${Math.random()}cart`}
    />,
  ];
};

const UnauthRoutes = () => {
  return [
    <Route
      path={Paths.register}
      component={Register}
      key={`${Math.random()}login`}
    />,
    <Route
      path={Paths.login}
      component={Login}
      key={`${Math.random()}register`}
    />,
  ];
};

const authRoutes = () => {
  return <Route path={Paths.profile} component={Profile} />;
};

const Scenes = (props) => {
  const { auth } = props;
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path={Paths.product} component={Products} />
        {ClientRoutes()}
        {CurierRoutes()}
        {!auth ? UnauthRoutes() : authRoutes()}
        <Redirect exact to="/products" />
      </Switch>
      <Footer />
      <Notifications />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
});

export default connect(mapStateToProps, null)(Scenes);
