import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Paths from '../constants/paths';
import Header from './header/header.jsx';
import Products from './products/wrapper.jsx';
import Orders from './orders/wrapper.jsx';
import { Delivery } from './delivery/delivery.jsx';
import { Request } from './requests/requests.jsx';
import Register from './register/register.jsx';
import Login from './login/login.jsx';
import { Main } from './main/main.jsx';
import Profile from './profile/profile.jsx';
import Notifications from './notification/notifications.jsx';

export default function Scenes(props) {
  const { auth } = props;

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path={Paths.product} component={Products} />
        <Route path={Paths.order} component={Orders} />
        <Route path={Paths.delivery} component={Delivery} />
        <Route path={Paths.request} component={Request} />
        {!auth ? <UnauthRoutes /> : null}

        <Route path={Paths.profile} component={Profile} />
        <Redirect exact to="/" />
      </Switch>
      <Notifications />
    </>
  );
}

const UnauthRoutes = () => {
  return (
    <>
      <Route path={Paths.register} component={Register} />
      <Route path={Paths.login} component={Login} />
    </>
  );
};
