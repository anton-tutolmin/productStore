import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Paths from '../constants/paths';
import Header from './header/header.jsx';
import Products from './products/wrapper.jsx';
import Orders from './orders/wrapper.jsx';
import { Delivery } from './delivery/delivery.jsx';
import Request from './requests/wrapper.jsx';
import Register from './register/register.jsx';
import Login from './login/login.jsx';
import { Main } from './main/main.jsx';
import Profile from './profile/profile.jsx';
import Notifications from './notification/notifications.jsx';

const ClientRoutes = () => {
  return <Route path={Paths.order} component={Orders} />;
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
  const { userType, auth } = props;
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path={Paths.product} component={Products} />
        {userType === 1 ? ClientRoutes() : null}
        {userType === 2 ? CurierRoutes() : null}
        {!auth ? UnauthRoutes() : authRoutes()}
        <Redirect exact to="/products" />
      </Switch>
      <Notifications />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  userType: state.user.type,
});

export default connect(mapStateToProps, null)(Scenes);
