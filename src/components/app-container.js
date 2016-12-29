import React, { PropTypes } from 'react';

import Header from './header';
import Footer from './footer';
import '../styles/app.css';

const App = ({ children }) => (
  <div className="app-container">
    <Header />
    {children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
