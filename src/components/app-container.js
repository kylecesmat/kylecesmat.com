import React, { PropTypes } from 'react';

import '../styles/app.css';

const App = ({ children }) => (<div>{children}</div>);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
