import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Paths from '../constants/paths';
import { Header } from './header.jsx';
import Products from './products.jsx';
import { Orders } from './orders.jsx';
import { Delivery } from './delivery.jsx';
import { Request } from './requests.jsx';
import { Register } from './register.jsx';
import { Login } from './login.jsx';
import { Main } from './main.jsx';
import { Profile } from './profile.jsx';

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
        {!auth ? (
          <>
            <Route path={Paths.register} component={Register} />
            <Route path={Paths.login} component={Login} />
            <Route path={Paths.profile} component={Profile} />
          </>
        ) : null}
        <Route component={Main} />
      </Switch>
    </>
  );
}
