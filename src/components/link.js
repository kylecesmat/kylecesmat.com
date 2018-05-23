import React from 'react';
import GatsbyLink from 'gatsby-link';
import styled, { css } from 'styled-components';
import colors from '../styles/colors';

const styles = css`
  color: ${colors.linkColor};
  text-decoration: none;
  font-weight: 500;
  transition: color ease-in 50ms;

  &:hover {
    color: ${colors.white};
  }
`;

const Anchor = styled.a`
  ${styles};
`;

const InternalLink = styled(GatsbyLink)`
  ${styles};
`;

const Link = ({ active, external, children, ...props }) => {
  const Component = external ? Anchor : InternalLink;

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  // @TODO this is disgusting
  // eslint-disable-next-line
  delete props.isMobile;

  return (
    <Component {...props} {...externalProps}>
      {children}
    </Component>
  );
};

export default Link;
