import React, { PropTypes } from 'react';

import Header from './header';
import '../styles/app.css';

const App = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
