import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import layout from '../styles/layout';

const Wrapper = styled.div`
  padding: 15px;
  max-width: ${layout.containerWidth}px;
  width: 100%;
  margin: 0 auto;
`;

export default class Page extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}
