import React from 'react';
import { Route, Redirect } from 'react-router';

import AppContainer from './components/app-container';

import Home from './pages/home';
import About from './pages/about';
import Post from './pages/post';

// All absolute routes need to be defined in static-routes.js
const Routes = (
  <Route component={AppContainer}>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/:post" component={Post} />
    <Redirect from="*" to="/" />
  </Route>
);

export default Routes;
