import React from 'react';
import { Switch } from 'react-router-dom';

import Cart from '../pages/Cart';
import Vouchers from '../pages/Vouchers';
import About from '../pages/About';
import Company from '../pages/Company';
import Companies from '../pages/Companies';
import Home from '../pages/Home';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Error404 from '../pages/404';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/login" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/empresas" exact component={Companies} />
      <Route path="/empresas/:companySlug" exact component={Company} />
      <Route path="/sobre" exact component={About} />
      <Route path="/vouchers" exact component={Vouchers} isPrivate />
      <Route path="/carrinho" exact component={Cart} isPrivate />

      <Route component={Error404} isPrivate />
    </Switch>
  );
}
