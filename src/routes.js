import React from 'react';
import { Route, Redirect } from 'react-router';

import App from './layouts/app';

import Home from './pages/home';

const Routes = (
  <Route component={App}>
    <Route path="/hello" component={Home} />
    <Redirect from="/" to="/hello" />
  </Route>
);

export default Routes;
