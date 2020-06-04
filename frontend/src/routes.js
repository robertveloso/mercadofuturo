import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Cart from './pages/Cart';
import Vouchers from './pages/Vouchers';
import About from './pages/About';
import Company from './pages/Company';
import Companies from './pages/Companies';
import Home from './pages/Home';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/empresas" exact component={Companies} />
      <Route path="/empresas/:companySlug" exact component={Company} />
      <Route path="/sobre" exact component={About} />
      <Route path="/vouchers" exact component={Vouchers} />
      <Route path="/carrinho" exact component={Cart} />
    </Switch>
  );
}
