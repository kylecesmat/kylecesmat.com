import React from 'react';
import GatsbyLink from 'gatsby-link';
import styled, { css } from 'styled-components';
import colors from '../styles/colors';

const styles = css`
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

const styledLinkStyles = css`
  box-shadow: ${colors.linkBackgroundColor} 0px -5px 0px 0px inset;
  border-bottom: 1px solid ${colors.linkBackgroundColor};
  transition: background 0.4s ease-out;
  font-weight: 100;

  &:hover {
    background-color: ${colors.linkBackgroundColor};
  }
`;

const Anchor = styled.a`
  ${styles};
  ${(props) => props.styled && styledLinkStyles};
`;

const InternalLink = styled(GatsbyLink)`
  ${styles};
  ${(props) => props.styled && styledLinkStyles};
`;

const Link = ({ active, external, children, ...props }) => {
  const Component = external ? Anchor : InternalLink;
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component {...props} {...externalProps}>
      {children}
    </Component>
  );
};

export default Link;
